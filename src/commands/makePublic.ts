import { Item } from 'qiita-js-2';
import { window } from 'vscode';
import { client } from '../client';

export async function makePublic (arg: object & { item: Item }) {
  if (!arg.item.private) {
    return window.showInformationMessage('この投稿は既に公開されています。');
  }

  const _continue = '公開にする';
  const cancel    = 'キャンセル';

  const result = await window.showInformationMessage('投稿を削除してもよろしいですか? 一度公開にしてしまうと非公開に戻すことは出来ません。', _continue, cancel);

  if (result !== _continue) {
    return;
  }

  try {
    await client.updateItem(arg.item.id, {
      body: arg.item.body,
      title: arg.item.title,
      tags: arg.item.tags,
      private: false,
    });

    return window.showInformationMessage(`公開範囲を公開に変更しました`);
  } catch (error) {
    return window.showErrorMessage(error.toString());
  }
}
