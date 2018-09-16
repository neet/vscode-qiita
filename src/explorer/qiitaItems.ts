import * as path from 'path';
import { Item } from 'qiita-js-2';
import { Command, TreeDataProvider, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';
import { cacheManager } from '../cacheManager';
import { client } from '../client';
import { COMMAND_OPEN_ITEM } from '../constants';
// import { itemList } from '../stores/itemList';
// import { items } from '../stores/items';

export class QiitaItemProvider implements TreeDataProvider<QiitaItem> {

  /**
   * `element` に対応するツリーアイテムを取得
   * @param element 取得するelement
   * @return ツリーアイテム
   */
  public getTreeItem (element: QiitaItem): TreeItem {
    return element;
  }

  /**
   * 小要素を取得
   * @param element 取得するelement
   */
  public async getChildren (/* element?: QiitaItem */): Promise<QiitaItem[]> {
    // if (element) {
    //   return array of item
    // }

    const { value: items } = await client.fetchMyItems('1', '60').next();

    return items.map((item) => {
      const path = cacheManager.saveItem(item);

      const command = {
        command:   COMMAND_OPEN_ITEM,
        title:     '',
        arguments: [ path ],
      };

      return new QiitaItem(item, TreeItemCollapsibleState.None, command);
    });
  }
}

export class QiitaItem extends TreeItem {
  /**
   * "Qiitaの投稿" ビューに表示されるアイテム
   * @param item Qiitaの投稿
   * @param collapsibleState アイテムが折り畳まれているかの状態
   * @param command クリック時に発火するコマンド
   */
  constructor (
    public readonly item: Item,
    public readonly collapsibleState: TreeItemCollapsibleState,
    public readonly command: Command,
  ) {
    super(item.title, collapsibleState);
  }

  // public iconPath = this.collapsibleState === TreeItemCollapsibleState.Expanded
  //   ? path.join(__filename, '..', '..', '..', 'resources', 'dark', 'file_focused.svg')
  //   : path.join(__filename, '..', '..', '..', 'resources', 'dark', 'file.svg');

  public resourceUri = Uri.parse('text.md');

  public contextValue = 'qiitaItems';
}
