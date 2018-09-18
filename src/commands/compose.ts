import { CreateItemOptions } from 'qiita-js-2';
import { commands, Uri, window, workspace } from 'vscode';
import { client } from '../client';
import { tagQuickPickCreator } from '../quickpicks/tagQuickPickCreator';
import { titleInputBoxCreator } from '../quickpicks/titleInputBoxCreator';
import { visibilityQuickPickCreator } from '../quickpicks/visibilityQuickPickCreator';
import { createMultiStepInput } from '../utils/createMultiStepInput';

const getFilenameFromPath = (filename: string) => {
  const splitPath = filename.split('/');
  [filename] = splitPath[splitPath.length - 1].split('.');

  return filename;
};

export function compose (arg: object & { path: string }) {
  const fileName = getFilenameFromPath(arg.path);

  const titleInputBox       = titleInputBoxCreator(fileName);
  const tagsQuickPick       = tagQuickPickCreator([]);
  const visibilityQuickPick = visibilityQuickPickCreator();

  const options: CreateItemOptions = {
    title: '',
    tags: [],
    body: '',
    private: false,
  };

  workspace.openTextDocument(arg.path).then((document) => {
    options.body = document.getText();
  });

  titleInputBox.onDidAccept(() => {
    options.title = titleInputBox.value;
  });

  tagsQuickPick.onDidAccept(() => {
    options.tags = tagsQuickPick.selectedItems.map((item) => ({
      name: item.label,
      versions: [],
    }));
  });

  visibilityQuickPick.onDidAccept(async () => {
    options.private = visibilityQuickPick.selectedItems[0].label === '限定公開';
    const openInBrowswer = 'ブラウザで確認';

    try {
      visibilityQuickPick.hide();
      const item = await client.createItem(options);
      const result = await window.showInformationMessage('投稿を公開しました', openInBrowswer);

      if (result === openInBrowswer) {
        commands.executeCommand('vscode.open', Uri.parse(item.url));
      }
    } catch (error) {
      window.showErrorMessage(error.toString());
    }
  });

  const multiStepInput = createMultiStepInput([
    titleInputBox,
    tagsQuickPick,
    visibilityQuickPick,
  ]);

  multiStepInput();
}
