import * as vscode from 'vscode';
import { client } from '../client';
import { cacheManager } from '../cacheManager';
import {
  COMMAND_OPEN_ITEM,
  VIEW_QIITA_ITEMS,
} from '../constants';

export class QiitaItemProvider implements vscode.TreeDataProvider<QiitaItem> {

  private itemsGenerator = client.fetchMyItems('1', '60');

  public getTreeItem (element: QiitaItem): vscode.TreeItem {
    return element;
  }

  public async getChildren (/* element?: QiitaItem */): Promise<QiitaItem[]> {
    // if (element) {
    //   return array of item
    // }

    const { value: items } = await this.itemsGenerator.next();

    return items.map((item) => {
      const path = cacheManager.saveItem(item);

      const command = {
        command:   COMMAND_OPEN_ITEM,
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

  public contextValue = VIEW_QIITA_ITEMS;
}
