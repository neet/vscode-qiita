import { Item } from 'qiita-js-2';
import { client } from '../client';
// import { command } from 'vscode';

export class Items  {

  /** アイテムのストア */
  public items: { [K: string]: Item } = {};

  /** アイテムを取得するイテレーター */
  private itemsIterator = client.fetchMyItems('1', '60');

  constructor () {
    // command.registerCommand()
  }

  /**
   * 渡されたアイテムの配列をストアに補完
   * @param items アイテムの配列
   */
  protected normalizeItems (items: Item[]) {
    for (const item of items) {
      this.items[item.id] = item;
    }
  }

  /**
   * アイテムのイテレーターを続行
   */
  public async expandItems () {
    const items = (await this.itemsIterator.next()).value;
    this.normalizeItems(items);
  }

  /**
   * アイテムのイテラブルを初期化して取得
   */
  public async refreshItems () {
    const items = (await this.itemsIterator.next('reset')).value;
    this.normalizeItems(items);
  }
}

export const items = new Items();
