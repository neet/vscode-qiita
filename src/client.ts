import Qiita from 'qiita-js-2';
import { workspace } from 'vscode';

const qiita = new Qiita();
const { token } = workspace.getConfiguration('md2qiita');

qiita.setToken(token);

export const client = qiita;
