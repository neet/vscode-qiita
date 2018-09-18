import { commands, window /* , ExtensionContext */} from 'vscode';
import * as nls from 'vscode-nls';
import { compose } from './commands/compose';
import { deleteItem } from './commands/deleteItem';
import { editTags } from './commands/editTags';
import { makePublic } from './commands/makePublic';
import { openItemExternal } from './commands/openItemExternal';
import { QiitaItemProvider } from './explorer/qiitaItems';
import './polyfills';

nls.config(process.env.VSCODE_NLS_CONFIG as nls.Options)();

export function activate (/*context: ExtensionContext */) {
  window.registerTreeDataProvider('qiitaItems', new QiitaItemProvider());

  commands.registerCommand('qiita.openItem', () => undefined);
  // commands.registerCommand('qiita.fetchItem', items.refreshItems, items);
  // commands.registerCommand('qiita.searchTags', tags.searchTag, tags);

  commands.registerCommand('qiita.editTags', editTags);
  commands.registerCommand('qiita.makePublic', makePublic);

  commands.registerCommand('qiita.compose', compose);

  commands.registerCommand('qiita.openItemExternal', openItemExternal);
  commands.registerCommand('qiita.deleteItem', deleteItem);
}

export function deactivate () {
}
