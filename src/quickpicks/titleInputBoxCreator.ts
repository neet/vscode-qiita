import { window } from 'vscode';

/**
 * タイトルを指定させるInputBoxを作成
 * @param defaultValue 初期のタイトル
 * @return InputBox
 */
export function titleInputBoxCreator (defaultValue?: string) {
  const inputBox = window.createInputBox();

  inputBox.title             = '投稿のタイトルを入力してください';
  inputBox.value             = defaultValue || '';
  inputBox.placeholder       = '例) サルでもわかる！Rails入門';
  inputBox.validationMessage = 'タイトルは255文字まで有効です';

  return inputBox;
}
