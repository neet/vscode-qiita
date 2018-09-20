import { CreateItemOptions } from 'qiita-js-2';
import { commands, Uri, window, workspace } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import { configuration } from '../configuration';
import { tagQuickPickCreator } from '../quickpicks/tagQuickPickCreator';
import { titleInputBoxCreator } from '../quickpicks/titleInputBoxCreator';
import { privateLabel, visibilityQuickPickCreator } from '../quickpicks/visibilityQuickPickCreator';
import { createMultiStepInput } from '../utils/createMultiStepInput';
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
  }

  // テキストエディタから発火した場合
  if (window.activeTextEditor) {
    options.title = getFilenameFromPath(window.activeTextEditor.document.fileName);
    options.body  = window.activeTextEditor.document.getText();
  }

  const titleInputBox       = titleInputBoxCreator(options.title);
  const tagsQuickPick       = tagQuickPickCreator();
  const visibilityQuickPick = visibilityQuickPickCreator();

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
    options.private = visibilityQuickPick.selectedItems[0].label === privateLabel;

    try {
      visibilityQuickPick.hide();

      const item = await client.createItem(options);

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

      return;
    } catch (error) {
      return handleErrorMessage(error);
    }
  });

  createMultiStepInput([
    titleInputBox,
    tagsQuickPick,
    visibilityQuickPick,
  ])();
}
