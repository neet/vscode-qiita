export class ItemList {
  /**
   * Redux同様、ストア内に重複したデータが無いデザインになっているので
   * itemの実態はあくまで stores/items にしか置かず、各ユーザー/タグ/検索結果が
   * どのitemの組を持っているかはこのストア内のキーにidを示す文字列の配列で保管されます。
   */
  public itemList = new Set<string>();
}

export const itemList = new ItemList();
