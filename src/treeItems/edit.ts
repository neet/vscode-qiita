import * as vscode from 'vscode';

export class QiitaEditProvider implements vscode.TreeDataProvider<QiitaEdit> {

  public getTreeItem (element: QiitaEdit): vscode.TreeItem {
    return element;
  }

  public getChildren (element?: QiitaEdit): QiitaEdit[] {
    // if (element) {
    //   return array of item
    // }

    const items = [
      {
        title: "投稿を公開する",
      },
      {
        title: "投稿を下書き保存する",
      },
      {
        title: "投稿を削除する",
      },
    ]

    return items.map((item) =>
      new QiitaEdit(item.title, vscode.TreeItemCollapsibleState.None),
    );
  }
}

export class QiitaEdit extends vscode.TreeItem {
  constructor (
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
  ) {
    super(label, collapsibleState);
  }
}
