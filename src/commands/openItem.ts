import * as fs from 'fs';
import { Item } from 'qiita-js-2';
import { TextDocument, Uri, window, workspace } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import { handleErrorMessage } from '../utils/errorHandler';

const localize = nls.loadMessageBundle();

/**
 * ワークスペース内でQiitaから同期したファイルを保存したときに呼ばれるイベントリスナ
 * @param item 投稿の元データ
 * @param document 保存されたドキュメント
 */
export const updater = async (item: Item, document: TextDocument) => {
  const body = document.getText();

  if (body === item.body) {
    return;
  }

  try {
    await client.updateItem(item.id, {
      title: item.title,
      tags: item.tags,
      body,
    });

    fs.writeFileSync(document.uri.path, document.getText());

    window.showInformationMessage(localize(
      'commands.openItem.updateSuccess',
      '投稿を更新しました',
    ));
  } catch (error) {
    handleErrorMessage(error);
  }
};

/**
 * アイテムを開くコマンドハンドラーを返す関数
 * @param storagePath 拡張機能のストレージのpath
 */
export function openItem (storagePath?: string) {
  return async (item: Item) => {
    if (!storagePath) {
      return;
    }

    try {
      const fileUri = Uri.parse(`file://${storagePath}/${item.id}.md`);

      // 拡張機能用ディレクトリがない場合初期化
      if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath);
      }

      // まだファイルをローカルに保存していない場合初期化
      if (!fs.existsSync(fileUri.fsPath)) {
        fs.writeFileSync(fileUri.fsPath, item.body);
      }

      const document = await workspace.openTextDocument(fileUri);
      await window.showTextDocument(document);

      // 保存時にアップデートするためのイベントリスナを追加
      workspace.onDidSaveTextDocument(async (updatedDocument) => {
        if (updatedDocument.uri.path === fileUri.path) {
          await updater(item, updatedDocument);
        }
      });
    } catch (error) {
      window.showErrorMessage(localize(
        'commands.openItem.failure.fallback',
        'ファイルの表示に失敗しました。指定された投稿は存在しない可能性があります。',
      ));
    }
  };
}
