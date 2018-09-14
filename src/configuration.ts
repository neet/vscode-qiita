import { workspace, WorkspaceConfiguration } from 'vscode';
import { CONFIGURATION } from './constants';

interface Configuration extends WorkspaceConfiguration {
  /** Qiitaのアクセストークン */
  readonly token?: string;

  /** 投稿を公開した際にtwitterで共有するかどうか */
  readonly tweetOnCreateItem?: boolean;

  /** 投稿を公開した際にGitHub Gistで共有するかどうか */
  readonly gistOnCreateItem?: boolean;
}

export const configuration: Configuration = workspace.getConfiguration(CONFIGURATION);
