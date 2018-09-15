import Fuse from 'fuse.js';
import { Item, Tag } from 'qiita-js-2';
import { client } from '../client';

export class Tags {

  /** タグのストア */
  public tags = new Map<string, Tag>();

  /** タグを返すイテレーター */
  private tagsIterator = client.fetchTags('1', '60', 'count');

  private normalizeTags (tags: Tag[]) {
    for (const tag of tags) {
      this.tags.set(tag.id, tag);
    }
  }

  /**
   * タグを投稿数順に取得
   */
  public async fetchTags () {
    const tags = (await this.tagsIterator.next()).value;
    this.normalizeTags(tags);
  }

  /**
   * 指定されたIDのタグを取得
   * @param id タグのID
   */
  public async fetchTag (id: string) {
    const tag = await client.fetchTag(id);
    this.normalizeTags([ tag ]);
  }

  /**
   * 指定された投稿についているタギングをタグとして取得
   * @param item 投稿
   */
  public async fetchTagsFromItem (item: Item) {
    // タギングの `name` === タグの `id` ということで合っている
    // はずなので `name` を引数にタグを取得しています。APIの仕様に明記されておらず :(
    const tags = await Promise.all(item.tags.map(({ name }) => client.fetchTag(name)));
    this.normalizeTags(tags);
  }

  /**
   * ストア内のタグをあいまい検索
   * @param query 曖昧なタグID
   * @param maxTags あいまい検索するタグの最大値
   * @return 成功時にマッチするタグの配列を返すPromise
   */
  public searchTag (query: string, maxTags = 10): Promise<Tag[]> {
    // Fuse.jsがArrayしか受け付けないのでIterableをArrayに変換
    const tags = [...this.tags.values()];

    const fuse = new Fuse(tags, {
      threshold: 0,
      location: 0,
      distance: 100,
      keys: ['id'],
      findAllMatches: true,
      maxPatternLength: 32,
      minMatchCharLength: 1,
    });

    return new Promise((resolve, reject) => {
      try {
        const result = fuse.search<Tag>(query).slice(0, maxTags);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const tags = new Tags();
