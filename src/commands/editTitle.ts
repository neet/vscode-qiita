import { Item } from 'qiita-js-2';
import { window } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import { qiitaItemsProvider } from '../explorers/qiitaItems';
import { titleInputBoxCreator, validateTitleInputBox } from '../quickpicks/titleInputBox';
import { handleErrorMessage } from '../utils/errorHandler';

const localize = nls.loadMessageBundle();

/**
 * タイトル編集用のコマンドのハンドラー
 * @param コマンドから渡される引数
 */
export function editTitle (resource: { item: Item }) {
  const { item } = resource;
  const inputBox = titleInputBoxCreator(item.title);

  inputBox.onDidAccept(async () => {
    if (!validateTitleInputBox(inputBox)) {
      return window.showErrorMessage(localize(
        'quickpicks.titleInputBox.failure.validationError',
        'タイトルは1文字以上255文字以内で入力してください。',
      ));
    }

    try {
      inputBox.hide();

      await client.updateItem(item.id, {
        body: item.body,
        tags: item.tags,
        title: inputBox.value,
      });

      await qiitaItemsProvider.refreshItems();

      return window.showInformationMessage(localize(
        'commands.editTitle.success',
        'タイトルを編集しました',
      ));
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.warn(error);

      return handleErrorMessage(error);
    }
  });

  inputBox.show();
}
