import { window } from 'vscode';

export function title (defaultValue?: string) {
  const input = window.createInputBox();

  input.title = '投稿のタイトルを入力してください';
  input.value = defaultValue || '';
  input.placeholder = '例) サルでもわかる！Rails入門';
  input.validationMessage = 'タイトルは255文字まで有効です';

  return input;
}
