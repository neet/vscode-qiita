import { commands, ConfigurationChangeEvent, ExtensionContext, window, workspace } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from './client';
import { compose } from './commands/compose';
import { deleteItem } from './commands/deleteItem';
import { editTags } from './commands/editTags';
import { editTitle } from './commands/editTitle';
import { expandItems } from './commands/expandItems';
import { makePublic } from './commands/makePublic';
import { openItem } from './commands/openItem';
import { openItemExternal } from './commands/openItemExternal';
import { qiitaItemsProvider } from './explorers/qiitaItems';

nls.config(process.env.VSCODE_NLS_CONFIG as nls.Options)();
const localize = nls.loadMessageBundle();

export function activate (context: ExtensionContext) {
  window.registerTreeDataProvider('qiitaItems', qiitaItemsProvider);

  context.subscriptions.push(
    workspace.onDidChangeConfiguration(refreshUserState),
    commands.registerCommand('qiita.openItem', openItem(context.storagePath)),
    commands.registerCommand('qiita.editTags', editTags),
    commands.registerCommand('qiita.makePublic', makePublic),
    commands.registerCommand('qiita.compose', compose),
    commands.registerCommand('qiita.openItemExternal', openItemExternal),
    commands.registerCommand('qiita.deleteItem', deleteItem),
    commands.registerCommand('qiita.editTitle', editTitle),
    commands.registerCommand('qiita.expandItems', expandItems),
  );

  if (!workspace.getConfiguration('qiita').get('token')) {
    window.showInformationMessage(localize(
      'general.information.unauthorized',
      'まだQiitaアカウントを連携していないようです。設定画面からトークンを入力することで利用可能になります。',
    ));
  }
}

export function deactivate () {
  /* none */
}

/**
 * 設定が変更されたときにトークンをセットし直してツリーデータをリフレッシュ
 * @param e 変更イベント
 */
export const refreshUserState = async (e: ConfigurationChangeEvent) => {
  if (e.affectsConfiguration('qiita.token')) {
    client.setToken(workspace.getConfiguration('qiita').get('token') || '');
    await qiitaItemsProvider.refreshItems();
  }
};
