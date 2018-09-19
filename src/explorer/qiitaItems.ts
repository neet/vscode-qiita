import { Item } from 'qiita-js-2';
import { Command, TreeDataProvider, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';

const localize = nls.loadMessageBundle();

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

    const { value: items } = await client.fetchMyItems({page: 1, per_page: 60}).next();

    return items.map((item) => {
      const command = {
        command:   'qiita.openItem',
        title:     localize('commands.openItem.title', '開く'),
        arguments: [ item ],
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

  public resourceUri = Uri.parse('file:///text.md');

  public contextValue = 'qiitaItems';
}
