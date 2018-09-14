import {
  window,
  commands,
  ExtensionContext,
} from 'vscode';
import { QiitaItemProvider } from './treeItems/items';
import { open } from './commands/open';

export function activate (context: ExtensionContext) {
  console.log(context);

  const qiitaItemProvider = new QiitaItemProvider();
  window.registerTreeDataProvider('qiita-item', qiitaItemProvider);

  commands.registerCommand('qiita.open', (path) => open(path));
}

export function deactivate() {
}
