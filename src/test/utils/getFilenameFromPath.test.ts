import { expect } from 'chai';
import { getFilenameFromPath } from '../../utils/getFilenameFromPath';

describe('getFilenameFromPath', () => {
  it('パスから拡張子を除いたファイル名を取得', () => {
    const path = 'file:///test.md';
    const result = getFilenameFromPath(path);
    expect(result).to.be.equal('test');
  });
});
