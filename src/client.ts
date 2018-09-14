import { Qiita } from 'qiita-js-2';
import { workspace } from 'vscode';

const { token } = workspace.getConfiguration('qiita');

export const client = new Qiita({ token });
