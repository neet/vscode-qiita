import { Item } from 'qiita-js-2';
import { window } from 'vscode';
import { client } from '../client';

/**
 * コマンド `qiita.deleteItem` のハンドラーで、Qiitaの投稿を削除します。
 * @param arg Commandで渡される引数。qiitaItemsビューから発行されるので `item` キーに投稿が入っています。
 */
export async function deleteItem (arg: object & { item: Item }) {
  const _continue = '削除する';
  const cancel    = 'キャンセル';

  const result = await window.showInformationMessage('投稿を削除してもよろしいですか?', _continue, cancel);

  if (result === cancel) {
    return;
  }

  try {
    await client.deleteItem(arg.item.id);
    return window.showInformationMessage('投稿を削除しました');
  } catch (error) {
    switch (error.name) {
      case 'QiitaUnauthorizedError':
      case 'QiitaForbiddenError':
        return window.showErrorMessage('削除に失敗しました。投稿の所有権を確認してもう一度お試しください。');
      case 'QiitaNotFoundError':
        return window.showErrorMessage('削除に失敗しました。この投稿は既に削除されている可能性があります。');
      case 'QiitaRateLimitError':
        return window.showErrorMessage('APIのレートリミットに到達しました。時間をおいてもう一度お試しください。');
      case 'QiitaInternalServerError':
        return window.showErrorMessage('削除に失敗しました。Qiitaのサーバーがダウンしている可能性があります。');
      default:
        return window.showErrorMessage('ご迷惑をお掛けしてしまい申し訳ございませんが、エラーが発生しました。 バグの可能性がある場合は開発者にご報告いただけると幸いです。\nhttps://github.com/neet/vscode-qiita/issues');
    }
  }
}
