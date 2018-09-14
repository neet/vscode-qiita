import {
  window,
  commands,
  ExtensionContext,
} from 'vscode';
import { QiitaItemProvider } from './treeItems/items';
import { open } from './commands/open';
import {
  VIEW_QIITA_ITEMS,
  COMMAND_OPEN_ITEM,
} from './constants';
import './polyfills';

export function activate (context: ExtensionContext) {
  const qiitaItemProvider = new QiitaItemProvider();

  window.registerTreeDataProvider(VIEW_QIITA_ITEMS, qiitaItemProvider);

  commands.registerCommand(COMMAND_OPEN_ITEM, (path) => open(path));
}

export function deactivate() {
}
