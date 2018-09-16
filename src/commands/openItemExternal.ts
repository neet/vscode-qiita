import { Item } from 'qiita-js-2';
import { commands, Uri } from 'vscode';

export function openItemExternal (arg: object & { item: Item }) {
  const { url } = arg.item;
  commands.executeCommand('vscode.open', Uri.parse(url));
}
