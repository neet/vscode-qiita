import { CreateItemOptions } from 'qiita-js-2';
import { commands, Uri, window, workspace } from 'vscode';
import { client } from '../client';
import { configuration } from '../configuration';
import { tagQuickPickCreator } from '../quickpicks/tagQuickPickCreator';
import { titleInputBoxCreator } from '../quickpicks/titleInputBoxCreator';
import { visibilityQuickPickCreator } from '../quickpicks/visibilityQuickPickCreator';
import { createMultiStepInput } from '../utils/createMultiStepInput';

/**
 * パスからファイル名を取得
 * @param path 相対/絶対パス
 * @return ファイル名
 */
export const getFilenameFromPath = (path: string) => {
  const splitPath = path.split('/');
  return splitPath[splitPath.length - 1].split('.')[0];
};

/**
 * 投稿を公開するためのQuickPickとInputBoxを表示
 * @param arg コマンドから渡される引数
 */
export function compose (arg: object & { path: string }): void {
  const fileName = getFilenameFromPath(arg.path);

  const titleInputBox       = titleInputBoxCreator(fileName);
  const tagsQuickPick       = tagQuickPickCreator();
  const visibilityQuickPick = visibilityQuickPickCreator();

  // Qiita.createItemのオプション
  const options: CreateItemOptions = {
    title: '',
    tags: [],
    body: '',
    private: false,
    tweet: configuration.tweetOnCreateItem,
    gist: configuration.gistOnCreateItem,
  };

  // ドキュメントから本文を取得してbodyに代入
  workspace.openTextDocument(arg.path).then((document) => {
    options.body = document.getText();
  });

  // titleInputBoxからタイトルを代入
  titleInputBox.onDidAccept(() => {
    options.title = titleInputBox.value;
  });

  // tagQuickPickからタグを代入
  tagsQuickPick.onDidAccept(() => {
    options.tags = tagsQuickPick.selectedItems.map((item) => ({
      name: item.label,
      versions: [],
    }));
  });

  // visibilityQuickPick終了時に公開状態を代入してQiita.createItemを呼び出し
  visibilityQuickPick.onDidAccept(async () => {
    options.private = visibilityQuickPick.selectedItems[0].label === '限定公開';
    const openInBrowswer = 'ブラウザで確認';

    try {
      visibilityQuickPick.hide();
      const item = await client.createItem(options);
      const result = await window.showInformationMessage('投稿を公開しました', openInBrowswer);

      if (result === openInBrowswer) {
        commands.executeCommand('vscode.open', Uri.parse(item.url));
      }
    } catch (error) {
      window.showErrorMessage(error.toString());
    }
  });

  createMultiStepInput([
    titleInputBox,
    tagsQuickPick,
    visibilityQuickPick,
  ])();
}
