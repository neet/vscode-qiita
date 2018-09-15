import {
  commands,
  window,
  // ExtensionContext,
} from 'vscode';
import { open } from './commands/open';
import {
  COMMAND_OPEN_ITEM,
  VIEW_QIITA_ITEMS,
} from './constants';
import './polyfills';
import { QiitaItemProvider } from './views/qiitaItems';

export function activate (/*context: ExtensionContext */) {
  const qiitaItemProvider = new QiitaItemProvider();

  window.registerTreeDataProvider(VIEW_QIITA_ITEMS, qiitaItemProvider);

  commands.registerCommand(COMMAND_OPEN_ITEM, (path) => open(path));
}

export function deactivate () {
}
