import { Item } from 'qiita-js-2';
import { window } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import { handleErrorMessage } from '../utils/errorHandler';

const localize = nls.loadMessageBundle();

/**
 * 公開状態を変更するか確認するダイアログを表示して、公開状態を変更します
 * @param arg コマンドから渡される引数
 */
export async function makePublic (arg: object & { item: Item }) {
  if (!arg.item.private) {
    return window.showInformationMessage(localize(
      'commands.qiita.makePublic.failure.alredyPublic',
      'この投稿は既に公開されています。',
    ));
  }

  const next = localize(
    'commands.qiita.makePublic.confirm.next',
    '公開にする',
  );

  const result = await window.showInformationMessage(
    localize(
      'commands.qiita.makePublic.confirm.title',
      '公開範囲を公開にしてもよろしいですか？ 一度公開にしてしまうと非公開に戻すことは出来ません。',
    ),
    next,
    localize(
      'commands.qiita.makePublic.confirm.cancel',
      'キャンセル',
    ),
  );

  if (result !== next) {
    return;
  }

  try {
    await client.updateItem(arg.item.id, {
      body: arg.item.body,
      title: arg.item.title,
      tags: arg.item.tags,
      private: false,
    });

    return window.showInformationMessage(localize(
      'commands.qiita.makePublic.success',
      '公開範囲を公開に変更しました',
    ));
  } catch (error) {
    return handleErrorMessage(error);
  }
}
