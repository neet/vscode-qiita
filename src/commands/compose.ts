import { commands, Uri, window, workspace } from 'vscode';
import { CreateItemOptions } from '../../../qiita-js-2';
import { client } from '../client';
import { tagsPicker } from '../quicks/tagPicker';
import { title } from '../quicks/title';
import { visibilityPicker } from '../quicks/visibilityPicker';
import { createMultiStepInput } from '../utils/createMultiStepInput';

const getFilenameFromPath = (filename: string) => {
  const splitPath = filename.split('/');
  [filename] = splitPath[splitPath.length - 1].split('.');

  return filename;
};

export function compose (arg: object & { path: string }) {
  const fileName = getFilenameFromPath(arg.path);

  const titleProcess            = title(fileName);
  const tagsPickerProcess       = tagsPicker([]);
  const visibilityPickerProcess = visibilityPicker();

  const options: CreateItemOptions = {
    title: '',
    tags: [],
    body: '',
    private: false,
  };

  workspace.openTextDocument(arg.path).then((document) => {
    options.body = document.getText();
  });

  titleProcess.onDidAccept(() => options.title = titleProcess.value);

  tagsPickerProcess.onDidAccept(() => options.tags = tagsPickerProcess.selectedItems.map((item) => ({
    name: item.label,
    versions: [],
  })));

  visibilityPickerProcess.onDidAccept(async () => {
    options.private = visibilityPickerProcess.selectedItems[0].label === '限定公開';
    const openInBrowswer = 'ブラウザでの確認';

    try {
      visibilityPickerProcess.hide();
      const item = await client.createItem(options);
      const result = await window.showInformationMessage('投稿を公開しました', openInBrowswer);

      if (result === openInBrowswer) {
        commands.executeCommand('vscode.open', Uri.parse(item.url));
      }
    } catch (error) {
      window.showErrorMessage(error.toString());
    }
  });

  const steps = createMultiStepInput([
    titleProcess,
    tagsPickerProcess,
    visibilityPickerProcess,
  ]);

  steps.handle({});
}
