import { CreateItemOptions } from 'qiita-js-2';
import { commands, Uri, window } from 'vscode';
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
 */
export async function composeFromTextEditor () {
  if (!window.activeTextEditor) {
    return;
  }

  const titleInputBox       = titleInputBoxCreator(getFilenameFromPath(window.activeTextEditor.document.fileName));
  const tagsQuickPick       = tagQuickPickCreator();
  const visibilityQuickPick = visibilityQuickPickCreator();

  // Qiita.createItemのオプション
  const options: CreateItemOptions = {
    title: '',
    body: window.activeTextEditor.document.getText(),
    tags: [],
    private: false,
    tweet: configuration.tweetOnCreateItem,
    gist: configuration.gistOnCreateItem,
  };

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
