import { expect } from 'chai';
import {
  insertInputRaw,
  makeQuickPickItemFromTag,
  tagQuickPickCreator,
  validateTagQuickPick,
} from '../../quickpicks/tagQuickPick';

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

  it('選択されたアイテムが0件のときにバリデーションエラー', () => {
    const quickPick = tagQuickPickCreator([]);
    const result  = validateTagQuickPick(quickPick);

    expect(result).to.be.false;
  });

  it('選択されたアイテムが5件以上のときにバリデーションエラー', () => {
    const quickPick = tagQuickPickCreator([
      { label: 'apple',     description: '1件の投稿' },
      { label: 'microsoft', description: '2件の投稿' },
      { label: 'facebook',  description: '3件の投稿' },
      { label: 'google',    description: '4件の投稿' },
      { label: 'intel',     description: '5件の投稿' },
      { label: 'sony',      description: '6件の投稿' },
    ]);
    const result = validateTagQuickPick(quickPick);

    expect(result).to.be.false;
  });
});
