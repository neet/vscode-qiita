import { commands, ExtensionContext, window } from 'vscode';
import * as nls from 'vscode-nls';
import { compose } from './commands/compose';
import { deleteItem } from './commands/deleteItem';
import { editTags } from './commands/editTags';
import { editTitle } from './commands/editTitle';
import { makePublic } from './commands/makePublic';
import { openItem } from './commands/openItem';
import { openItemExternal } from './commands/openItemExternal';
import { QiitaItemProvider } from './explorer/qiitaItems';
import './polyfills';

nls.config(process.env.VSCODE_NLS_CONFIG as nls.Options)();

export function activate (context: ExtensionContext) {
  window.registerTreeDataProvider('qiitaItems', new QiitaItemProvider());

  context.subscriptions.push(
    commands.registerCommand('qiita.openItem', openItem(context.storagePath)),
    commands.registerCommand('qiita.editTags', editTags),
    commands.registerCommand('qiita.makePublic', makePublic),
    commands.registerCommand('qiita.compose', compose),
    commands.registerCommand('qiita.openItemExternal', openItemExternal),
    commands.registerCommand('qiita.deleteItem', deleteItem),
    commands.registerCommand('qiita.editTitle', editTitle),
  );
}

export function deactivate () {
  /* none */
}
