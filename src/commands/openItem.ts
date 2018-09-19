import * as fs from 'fs';
import { Item } from 'qiita-js-2';
import { Uri, window, workspace } from 'vscode';
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

export function openItem (storagePath?: string) {
  return async (item: Item) => {
    try {
      const filePath = `${storagePath}/${item.id}.md`;
      const fileUri  = `file://${filePath}`;

      if (!storagePath) {
        return;
      }

      if (!fs.existsSync(storagePath)) {
        fs.mkdirSync(storagePath);
      }

      fs.writeFileSync(filePath, item.body);

      const document = await workspace.openTextDocument(Uri.parse(fileUri));
      await window.showTextDocument(document);
    } catch (error) {
      window.showErrorMessage(localize(
        'commands.openItem.failure.fallback',
        'ファイルの表示に失敗しました。指定された投稿は存在しない可能性があります。',
      ));
    }
  };
}
