import { expect } from 'chai';
import { getFilenameFromPath } from '../../commands/compose';

describe('compose', () => {
  it('パスから拡張子を除いたファイル名を取得', () => {
    const path = 'file:///test.md';
    const result = getFilenameFromPath(path);
    expect(result).to.be.equal('test');
  });
});
