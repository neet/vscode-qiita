import { Item } from 'qiita-js-2';
import {
  Command,
  Event,
  EventEmitter,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
  Uri,
} from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';

const localize = nls.loadMessageBundle();

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

  public resourceUri  = Uri.parse('file:///text.md'); // Hack: アイコンをMarkdownのものに
  public contextValue = 'qiitaItems';
}


class QiitaItemsProvider implements TreeDataProvider<QiitaItem> {
  private _onDidChangeTreeData: EventEmitter<QiitaItem | undefined> = new EventEmitter<QiitaItem | undefined>();
  public readonly onDidChangeTreeData: Event<QiitaItem | undefined> = this._onDidChangeTreeData.event;

  /**
   * ツリーデータを更新
   */
  public refresh () {
    this._onDidChangeTreeData.fire();
  }

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
  public async getChildren (): Promise<QiitaItem[]> {
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

export const qiitaItemsProvider = new QiitaItemsProvider();
