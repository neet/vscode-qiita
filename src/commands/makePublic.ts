import { Item } from 'qiita-js-2';
import { window } from 'vscode';
import { client } from '../client';
// import { visibilityPicker } from '../quicks/visibilityPicker';

export async function makePublic (arg: object & { item: Item }) {
  const _continue = '公開にする';
  const cancel    = 'キャンセル';

  const result = await window.showInformationMessage('投稿を削除してもよろしいですか? 一度公開にしてしまうと非公開に戻すことは出来ません。', _continue, cancel);

  if (result === cancel) {
    return;
  }

  try {
    await client.updateItem(arg.item.id, {
      body: arg.item.body,
      title: arg.item.title,
      tags: arg.item.tags,
      private: false,
    });

    window.showInformationMessage(`公開範囲を公開に変更しました`);
  } catch (error) {
    window.showErrorMessage(error.toString());
  }
}
