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
import { itemsStore } from '../stores/itemsStore';

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
    command: 'qiita.expandItems',
    title:   localize('commands.expandItems.title', 'さらに読み込む...'),
    arguments: [],
  };

  public contextValue = 'qiitaItems';
}


class QiitaItemsProvider implements TreeDataProvider<QiitaItem|ExpandItems> {
  private _onDidChangeTreeData: EventEmitter<QiitaItem|ExpandItems|undefined> = new EventEmitter<QiitaItem|ExpandItems|undefined>();
  public readonly onDidChangeTreeData: Event<QiitaItem|ExpandItems|undefined> = this._onDidChangeTreeData.event;

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
   * 子要素を取得
   * @param element 取得するelement
   */
  public async getChildren (): Promise<(QiitaItem|ExpandItems)[]> {
    if (itemsStore.items.size === 0) {
      await itemsStore.refreshItems();
    }

    const children = [];

    for (const item of itemsStore.items) {
      const command = {
        command:   'qiita.openItem',
        title:     localize('commands.openItem.title', '開く'),
        arguments: [ item ],
      };

      children.push(new QiitaItem(item, TreeItemCollapsibleState.None, command));
    }

    // アイテムが最後まで読み込まれていない場合、「さらに読み込む...」を挿入する
    if (!itemsStore.done) {
      children.push(new ExpandItems(TreeItemCollapsibleState.None));
    }

    return children;
  }
}

export const qiitaItemsProvider = new QiitaItemsProvider();
