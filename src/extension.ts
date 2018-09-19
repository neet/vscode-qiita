import { commands, ExtensionContext, window } from 'vscode';
import * as nls from 'vscode-nls';
import { composeFromExplorer } from './commands/composeFromExplorer';
import { composeFromTextEditor } from './commands/composeFromTextEditor';
import { deleteItem } from './commands/deleteItem';
import { editTags } from './commands/editTags';
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
    commands.registerCommand('qiita.composeFromExplorer', composeFromExplorer),
    commands.registerCommand('qiita.composeFromTextEditor', composeFromTextEditor),
    commands.registerCommand('qiita.openItemExternal', openItemExternal),
    commands.registerCommand('qiita.deleteItem', deleteItem),
  );
}

export function deactivate () {
  /* none */
}
