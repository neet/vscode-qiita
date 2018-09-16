import {
  commands,
  window,
  // ExtensionContext,
} from 'vscode';
import { deleteItem } from './commands/deleteItem';
import { openItemExternal } from './commands/openItemExternal';
import {
  // COMMAND_OPEN_ITEM,
  VIEW_QIITA_ITEMS,
} from './constants';
import { QiitaItemProvider } from './explorer/qiitaItems';
import './polyfills';
import { items } from './stores/items';
import { tags } from './stores/tags';

export function activate (/*context: ExtensionContext */) {
  const qiitaItemProvider = new QiitaItemProvider();

  window.registerTreeDataProvider(VIEW_QIITA_ITEMS, qiitaItemProvider);

  commands.registerCommand('qiita.openItem', () => undefined);
  commands.registerCommand('qiita.fetchItem', items.refreshItems, items);
  commands.registerCommand('qiita.searchTags', tags.searchTag, tags);

  commands.registerCommand('qiita.openItemExternal', openItemExternal);
  commands.registerCommand('qiita.deleteItem', deleteItem);
}

export function deactivate () {
}
