import { window } from 'vscode';
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

/**
 * タイトルを指定させるInputBoxを作成
 * @param defaultValue 初期のタイトル
 * @return InputBox
 */
export function titleInputBoxCreator (defaultValue?: string) {
  const inputBox = window.createInputBox();

  inputBox.value = defaultValue || '';

  inputBox.title = localize(
    'quickpicks.titleInputBox.title',
    '投稿のタイトルを入力してください',
  );

  inputBox.placeholder = localize(
    'quickpicks.titleInputBox.placeholder',
    '例) サルでもわかる！Rails入門',
  );

  inputBox.onDidChangeValue(() => {
    if (inputBox.value.length > 255) {
      inputBox.validationMessage = localize(
        'quickpicks.titleInputBox.validationMessage',
        'タイトルは255文字まで有効です',
      );
    }
  });

  return inputBox;
}
