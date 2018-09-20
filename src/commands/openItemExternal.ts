import { Item } from 'qiita-js-2';
import { commands, Uri } from 'vscode';

export function openItemExternal (resource: { item: Item }) {
  const { url } = resource.item;
  commands.executeCommand('vscode.open', Uri.parse(url));
}
