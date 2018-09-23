import { TreeItem, TreeItemCollapsibleState } from 'vscode';
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

export class ExpandItems extends TreeItem {
  /**
   * 「さらに読み込む」ボタンのためのアイテム
   * @param collapsibleState アイテムが折り畳まれているかの状態
   */
  constructor (public readonly collapsibleState: TreeItemCollapsibleState) {
    super(localize(
      'commands.expandItems.title',
      'さらに読み込む...',
    ), collapsibleState);
  }

  public command = {
    command:   'qiita.expandItems',
    title:     localize('commands.expandItems.title', 'さらに読み込む...'),
    arguments: [],
  };

  public contextValue = 'qiitaItems';
}
