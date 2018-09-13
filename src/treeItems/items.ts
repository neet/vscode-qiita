import * as path from 'path';
import * as vscode from 'vscode';
import { client } from '../client';
import { cacheManager } from '../cacheManager';

export class QiitaItemProvider implements vscode.TreeDataProvider<QiitaItem> {

  public getTreeItem (element: QiitaItem): vscode.TreeItem {
    return element;
  }

  public async getChildren (element?: QiitaItem): Promise<QiitaItem[]> {
    // if (element) {
    //   return array of item
    // }

    const items = await client.fetchMyItems('1', '60');

    return items.map((item) => {
      const path = cacheManager.saveItem(item);

      const command = {
        command:   'md2qiita.open',
        title:     '',
        arguments: [ path ],
      }

      return new QiitaItem(item.title, vscode.TreeItemCollapsibleState.None, command);
    });
  }
}

export class QiitaItem extends vscode.TreeItem {
  constructor (
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command: vscode.Command,
  ) {
    super(label, collapsibleState);
  }

  get tooltip (): string {
    return this.label;
  }

  public iconPath = {
    light: path.join(__filename, '..', '..', '..', 'resources', 'qitia.svg'),
    dark: path.join(__filename, '..', '..', '..', 'resources', 'qitia.svg'),
  };

  public contextValue = 'qiita-item';
}
