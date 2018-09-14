import { workspace } from 'vscode';

/**
 * 現在のワークスペース内の特定のファイルを開きます
 * @param path ファイルへのパス
 * @return ドキュメントを返すPromise
 */
export function open (path: string) {
  console.log(`called ${path}`);
  return workspace.openTextDocument(path);
}
