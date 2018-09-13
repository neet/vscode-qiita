import {
  window,
  commands,
  ExtensionContext,
} from 'vscode';
import { QiitaItemProvider } from './treeItems/items';
import { QiitaEditProvider } from './treeItems/edit';
import { open } from './commands/open';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate (context: ExtensionContext) {
  console.log(context);

  const qiitaItemProvider = new QiitaItemProvider();
  const qiitaEditProvider = new QiitaEditProvider();

  window.registerTreeDataProvider('qiita-item', qiitaItemProvider);
  window.registerTreeDataProvider('qiita-edit', qiitaEditProvider);

  commands.registerCommand('md2qiita.open', (path) => open(path));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
