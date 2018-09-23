import { Item } from 'qiita-js-2';
import { Command, TreeItem, TreeItemCollapsibleState, Uri } from 'vscode';

export class QiitaItem extends TreeItem {
  /**
   * "Qiitaの投稿" ビューに表示されるアイテム
   * @param item Qiitaの投稿
   * @param collapsibleState アイテムが折り畳まれているかの状態
   * @param command クリック時に発火するコマンド
   */
  constructor (
    public readonly item: Item,
    public readonly collapsibleState: TreeItemCollapsibleState,
    public readonly command: Command,
  ) {
    super(item.title, collapsibleState);
  }

  public resourceUri  = Uri.parse('file:///text.md'); // Hack: アイコンをMarkdownのものに
  public contextValue = 'qiitaItems';
}
