import { QiitaError } from 'qiita-js-2';
import { window } from 'vscode';
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

/**
 * QiitaErrorオブジェクトの内容に応じてshowErrorMessageに適切なメッセージを表示します。
 * @param error QiitaErrorを継承しているエラー
 */
export function handleErrorMessage <T extends QiitaError> (error: T) {
  switch (error.name) {
    case 'QiitaUnauthorizedError':
      return window.showErrorMessage(localize('general.failure.unauhtorized', 'リクエストに失敗しました。Qiitaアカウントを認証しているかお確かめの上もう一度お試しください'));
    case 'QiitaForbiddenError':
      return window.showErrorMessage(localize('general.failure.forbitten', 'リクエストに失敗しました。正しいアカウントにログインしているかをお確かめの上もう一度お試しください'));
    case 'QiitaNotFoundError':
      return window.showErrorMessage(localize('general.failure.notFound', 'リクエストに失敗しました。指定されたページは存在しないか削除された可能性があります。'));
    case 'QiitaRateLimitError':
      return window.showErrorMessage(localize('general.failure.rateLimit', 'APIのレートリミットに到達しました。時間をおいてもう一度お試しください。'));
    case 'QiitaInternalServerError':
      return window.showErrorMessage(localize('general.failure.InternalServerError', '削除に失敗しました。Qiitaのサーバーがダウンしている可能性があります。'));
    default:
      return window.showErrorMessage(localize('general.failure.fallback', 'ご迷惑をお掛けしてしまい申し訳ございませんが、エラーが発生しました。 バグの可能性がある場合は開発者にご報告いただけると幸いです。\nhttps://github.com/neet/vscode-qiita/issues'));
  }
}
