/**
 * パスからファイル名を取得
 * @param path 相対/絶対パス
 * @return ファイル名
 */
export const getFilenameFromPath = (path: string) => {
  const splitPath = path.split('/');
  return splitPath[splitPath.length - 1].split('.')[0];
};
