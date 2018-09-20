import { Item } from 'qiita-js-2';
import { client } from '../client';
import '../polyfills';

export class ItemsStore {
  /** 自分の投稿の配列 */
  public items = new Set<Item>();

  /** 最後のページまで行ったかどうか */
  public done = false;

  /** 自分の投稿の配列を返すイテラブル */
  protected itemsIterable = client.fetchMyItems({ page: 1, per_page: 60 });

  /**
   * イテラブルを初期化して最初のページを再取得
   */
  public async refreshItems () {
    const { value: items, done } = await this.itemsIterable.next('reset');
    this.items = new Set<Item>(items);
    this.done  = done;
  }

  /**
   * イテラブルのnextを呼び出し
   */
  public async expandItems () {
    const { value: items, done } = await this.itemsIterable.next();

    items.forEach((item) => {
      this.items.add(item);
    });

    this.done  = done;
  }
}

export const itemsStore = new ItemsStore();
