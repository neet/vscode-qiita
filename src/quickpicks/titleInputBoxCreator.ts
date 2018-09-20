import { InputBox, window } from 'vscode';
import * as nls from 'vscode-nls';

const localize = nls.loadMessageBundle();

/**
 * タイトルのバリデーション 1文字以上255文字以内
 * @param value バリデートするタイトル
 * @return 結果を示す真理値
 */
export const validateTitleInputBox = (inputBox: InputBox) => {
  return inputBox.value.length >= 1 && inputBox.value.length <= 255;
};

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
    if (!validateTitleInputBox(inputBox)) {
      inputBox.validationMessage = localize(
        'quickpicks.titleInputBox.validationMessage',
        'タイトルは255文字まで有効です',
      );
    } else {
      inputBox.validationMessage = '';
    }
  });

  return inputBox;
}
