import * as path from 'path';
import { Item } from 'qiita-js-2';
import { Position, Uri, workspace, WorkspaceEdit } from 'vscode';

class CacheManager {
  /**
   * 与えられたidをキャッシュファイルへの絶対パスに変換します
   * @param id Qiitaの投稿のID
   * @return 絶対パス
   */
  private makeFileUri (id: Item['id']) {
    if (!workspace.rootPath) {
      throw Error('Workspace not found');
    }

    const extension = 'md';

    return Uri.file(path.join(workspace.rootPath, `${id}.${extension}`));
  }

  /**
   * Qiitaの投稿をローカルに保存します
   * @param item Qiitaの投稿のオブジェクト
   * @return 保存したファイルへの絶対パスを返すPromise
   */
  public async saveItem (item: Item) {
    const fileUri = this.makeFileUri(item.id);
    const wsEdit  = new WorkspaceEdit();
    const insertPosition = new Position(0, 0);

    wsEdit.createFile(fileUri);
    wsEdit.insert(fileUri, insertPosition, item.body);
    await workspace.applyEdit(wsEdit);

    return fileUri;
  }

  /**
   * ローカルに保存したQiitaの投稿を取得します
   * @param id Qiitaの投稿のID
   * @return ファイルの内容
   */
  public getItem (id: Item['id']) {
    return this.makeFileUri(id);
  }
}

export const cacheManager = new CacheManager();
