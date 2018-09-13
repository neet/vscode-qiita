import { workspace } from 'vscode';

/**
 * Open specified file in current workspace
 * @param path Path to the file
 * @return Promise resolve to the document
 */
export function open (path: string) {
  console.log(`called ${path}`);
  return workspace.openTextDocument(path);
}
