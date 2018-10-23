import { Item } from 'qiita-js-2';
import { window } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import { qiitaItemsProvider } from '../explorers/qiitaItems';
import { handleErrorMessage } from '../utils/errorHandler';

const localize = nls.loadMessageBundle();

/**
 * コマンド `qiita.deleteItem` のハンドラーで、Qiitaの投稿を削除します。
 * @param resource Commandで渡される引数。qiitaItemsビューから発行されるので `item` キーに投稿が入っています。
 */
export async function deleteItem (resource: { item: Item }) {
  const next = localize(
    'commands.deleteItem.confirm.next',
    '削除する',
  );

  const result = await window.showInformationMessage(
    localize(
      'commands.deleteItem.confirm.title',
      '投稿を削除してもよろしいですか？',
    ),
    next,
    localize(
      'commands.deleteItem.confirm.cancel',
      'キャンセル',
    ),
  );

  if (result !== next) {
    return;
  }

  try {
    await client.deleteItem(resource.item.id);
    await qiitaItemsProvider.refreshItems();

    return window.showInformationMessage(localize(
      'commands.deleteItem.success',
      '投稿を削除しました',
    ));
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.warn(error);

    return handleErrorMessage(error);
  }
}
