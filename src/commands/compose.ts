import { CreateItemOptions } from 'qiita-js-2';
import { commands, Uri, window, workspace } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import { configuration } from '../configuration';
import { qiitaItemsProvider } from '../explorer/qiitaItems';
import { tagQuickPickCreator, validateTagQuickPick } from '../quickpicks/tagQuickPickCreator';
import { titleInputBoxCreator, validateTitleInputBox } from '../quickpicks/titleInputBoxCreator';
import { privateLabel, visibilityQuickPickCreator } from '../quickpicks/visibilityQuickPickCreator';
import { handleErrorMessage } from '../utils/errorHandler';
import { getFilenameFromPath } from '../utils/getFilenameFromPath';

const localize = nls.loadMessageBundle();

/**
 * アクティブなテキストエディタから投稿を公開するコマンドパレット向け関数
 * @param resource コマンドがexplorerから発火した際に渡される引数
 */
export async function compose (resource?: { path: string }) {
  const options: CreateItemOptions = {
    body:  '',
    title: '',
    tags: [],
    private: false,
    tweet: configuration.tweetOnCreateItem,
    gist: configuration.gistOnCreateItem,
  };

  // explorerから発火した場合
  if (resource && resource.path) {
    options.title = getFilenameFromPath(resource.path);
    options.body  = await workspace.openTextDocument(resource.path).then((document) => document.getText());

  // テキストエディタから発火した場合
  } else if (window.activeTextEditor) {
    options.title = getFilenameFromPath(window.activeTextEditor.document.fileName);
    options.body  = window.activeTextEditor.document.getText();
  }

  const titleInputBox       = titleInputBoxCreator(options.title);
  const tagsQuickPick       = tagQuickPickCreator();
  const visibilityQuickPick = visibilityQuickPickCreator();

  // ステップ数を追加
  [titleInputBox, tagsQuickPick, visibilityQuickPick].forEach((step, i, steps) => {
    step.totalSteps = steps.length;
    step.step = i;
  });

  // titleInputBoxからタイトルを代入
  titleInputBox.onDidAccept(() => {
    if (!validateTitleInputBox(titleInputBox)) {
      window.showErrorMessage(localize(
        'quickpicks.titleInputBox.failure.validationError',
        'タイトルは1文字以上255文字以内で入力してください。',
      ));
    } else {
      options.title = titleInputBox.value;
      titleInputBox.hide();
      tagsQuickPick.show();
    }
  });

  // tagQuickPickからタグを代入
  tagsQuickPick.onDidAccept(() => {
    if (!validateTagQuickPick(tagsQuickPick)) {
      window.showErrorMessage(localize(
        'quickpicks.tagQuickPick.failure.validationError',
        'タグは1つ以上5つ以内で選択してください。',
      ));
    } else {
      options.tags = tagsQuickPick.selectedItems.map((item) => ({
        name: item.label,
        versions: [],
      }));
      tagsQuickPick.hide();
      visibilityQuickPick.show();
    }
  });

  // visibilityQuickPick終了時に公開状態を代入してQiita.createItemを呼び出し
  visibilityQuickPick.onDidAccept(async () => {
    options.private = visibilityQuickPick.selectedItems[0].label === privateLabel;
    visibilityQuickPick.hide();

    try {
      const item = await client.createItem(options);
      qiitaItemsProvider.refresh();

      const openInBrowser = localize(
        'commands.compose.openInBrowser',
        'ブラウザで確認',
      );

      const result = await window.showInformationMessage(
        localize(
          'commands.compose.success',
          '投稿を公開しました',
        ),
        openInBrowser,
      );

      if (result === openInBrowser) {
        commands.executeCommand('vscode.open', Uri.parse(item.url));
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  });

  // 1つ目のステップから帰納的に呼び出し
  titleInputBox.show();
}
