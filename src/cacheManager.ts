import { workspace, WorkspaceEdit, Uri, Position } from 'vscode';
import * as path from 'path';
import Qiita from 'qiita-js-2';

class CacheManager {
  /**
   * Generate absolute filepath from given item id
   * @param id Id of qitia item
   * @return Absolute file path
   */
  public makeFileUri (id: Qiita.Item['id']) {
    if (!workspace.rootPath) {
      throw Error('Workspace not found')
    }

    const extension = 'md';

    return Uri.file(path.join(workspace.rootPath, `${id}.${extension}`));
  }

  /**
   * Save fetched qiita item to VSCode's local directory
   * @param item Object of Qiita item
   * @return Absolute path of saved file
   */
  public saveItem (item: Qiita.Item) {
    const fileUri = this.makeFileUri(item.id);
    const wsEdit  = new WorkspaceEdit();
    const insertPosition = new Position(0, 0);

    wsEdit.createFile(fileUri);
    wsEdit.insert(fileUri, insertPosition, item.body);
    workspace.applyEdit(wsEdit);

    return fileUri;
  }

  /**
   * Get saved qiita item from VSCode's local directory
   * @param id ID of qiita item
   * @return Body of the file
   */
  public getItem (id: Qiita.Item['id']) {
    return this.makeFileUri(id);
  }
}

export const cacheManager = new CacheManager();
