import { Qiita } from 'qiita-js-2';
import { workspace } from 'vscode';

export const client = new Qiita({
  token: workspace.getConfiguration('qiita').get('token') || '',
});
