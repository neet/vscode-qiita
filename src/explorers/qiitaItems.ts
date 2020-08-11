import { Item } from 'qiita-js-2';
import { Event, EventEmitter, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import '../polyfills';
import { ExpandItems } from './nodes/expandItemsNode';
import { QiitaItem } from './nodes/qiitaItemsNode';

const localize = nls.loadMessageBundle();

type NodeTypes = ExpandItems|QiitaItem;

class QiitaItemsProvider implements TreeDataProvider<NodeTypes> {
  /** TreeDataProviderの変更を制御するためのEventEmitter */
  private _onDidChangeTreeData: EventEmitter<NodeTypes|undefined> = new EventEmitter<NodeTypes|undefined>();

  /** 外部から参照するためのプロパティ */
  public readonly onDidChangeTreeData: Event<NodeTypes|undefined> = this._onDidChangeTreeData.event;

  /** 取得した投稿 */
  public items: Item[] = [];

  /** 全件取得したかどうか */
  public done = false;

  /** 自分の投稿の配列を返すイテラブル */
  protected itemsIterable = client.fetchMyItems({ page: 1, per_page: 60 });

  /**
   * ツリーデータを更新
   */
  protected async refresh () {
    this._onDidChangeTreeData.fire();
  }

  /**
   * イテラブルを初期化して最初のページを再取得
   */
  public async refreshItems () {
    const { value: items, done } = await this.itemsIterable.next('reset' as any);
    this.items = items;
    this.done  = done!;
    this.refresh();
  }

  /**
   * イテラブルのnextを呼び出し
   */
  public async expandItems () {
    const { value: items, done } = await this.itemsIterable.next();
    this.items = this.items.concat(items ?? []);
    this.done = done ?? false;
    this.refresh();
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
    if (!this.items.length) {
      await this.refreshItems();
    }

    const children: NodeTypes[] = this.items.map((item) => {
      const command = {
        command:   'qiita.openItem',
        title:     localize('commands.openItem.title', '開く'),
        arguments: [ item ],
      };

      return new QiitaItem(item, TreeItemCollapsibleState.None, command);
    });

    // アイテムが最後まで読み込まれていない場合、「さらに読み込む...」を挿入する
    if (!this.done) {
      children.push(new ExpandItems(TreeItemCollapsibleState.None));
    }

    return children;
  }
}

export const qiitaItemsProvider = new QiitaItemsProvider();
