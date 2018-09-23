import { Item } from 'qiita-js-2';
import { commands, Uri } from 'vscode';

/**
 * アイテムをブラウザで表示
 * @param resource コマンドから渡される引数
 */
export function openItemExternal (resource: { item: Item }) {
  const { url } = resource.item;
  commands.executeCommand('vscode.open', Uri.parse(url));
}
