import { window } from 'vscode';

export function tags (defaultValue?: string) {
  const input = window.createInputBox();

  input.title = '投稿に登録するタグを入力してください';
  input.value = defaultValue || '';
  input.placeholder = '例) Rails Ruby Mastodon';
  input.validationMessage = 'スペース区切りで複数指定で最大5つまで指定できます。';

  return input;
}
