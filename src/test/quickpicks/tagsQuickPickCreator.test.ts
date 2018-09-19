import { expect } from 'chai';
import { insertInputRaw, makeQuickPickItemFromTag } from '../../quickpicks/tagQuickPickCreator';

describe('tagQuickPickCreator', () => {
  it('渡されたIDと文字列からQuickPickItemを返す', () => {
    const quickPickItem = makeQuickPickItemFromTag('apple', 12345);

    expect(quickPickItem).to.deep.equal({
      label: 'apple',
      description: '12345件の投稿',
    });
  });

  it('渡されたキーワードが検索結果に無いときに検索結果の先頭に挿入', async () => {
    const result = insertInputRaw('apple', [
      { name: 'google',    url_name: 'google',    follower_count: 1, item_count: 1 },
      { name: 'facebook',  url_name: 'facebook',  follower_count: 2, item_count: 2 },
      { name: 'microsoft', url_name: 'microsoft', follower_count: 3, item_count: 2 },
    ]);

    expect(result).to.deep.include({ name: 'apple', url_name: 'apple', follower_count: 0, item_count: 0});
  });
});
