import { SearchTagResult } from 'qiita-js-2';
import { QuickPickItem, window } from 'vscode';
import { client } from '../client';

/**
 * Tagの情報を基にQuickPickItemを作成します
 * @param id タグのID
 * @param followersCount フォロワーの数
 * @return QuickPickItem
 */
export const makeQuickPickItemFromTag = (id: string, followersCount: number) => ({
  label: id,
  description: `${followersCount}件の投稿`,
});

/**
 * ユーザーからの入力が検索結果に無いときにその入力を結果の先頭に挿入
 * @param value ユーザーの入力
 * @param suggestions 検索結果
 * @return フォーマットされた検索結果
 */
export const insertInputRaw = (value: string, suggestions: SearchTagResult[]) => {
  if (!value) {
    return suggestions;
  }

  if (suggestions
    .map((tag) => tag.name)
    .map((name) => RegExp(name, 'i').test(value))
    .includes(true)) {
    return suggestions;
  }

  suggestions.unshift({ name: value, url_name: value, follower_count: 0, item_count: 0 });

  return suggestions;
};

/**
 * キーワードからタグを検索して QuickPickItem の形で返します
 * @param value キーワード
 * @return QuickPickItem
 */
export async function suggestTags (value: string): Promise<QuickPickItem[]> {
  const results = (await client.searchTags(value)).slice(0, 9);
  const formattedResults = insertInputRaw(value, results);
  return formattedResults.map((tag) => makeQuickPickItemFromTag(tag.name, tag.follower_count));
}

/**
 * タグを指定させるQuickPickerを作成
 * @param selectedItems 選択済みのタグ
 * @return QuickPicker
 */
export function tagQuickPickCreator (selectedItems?: QuickPickItem[]) {
  const quickPick = window.createQuickPick();

  quickPick.canSelectMany = true;
  quickPick.items         = selectedItems || [];
  quickPick.selectedItems = selectedItems || [];
  quickPick.title         = '投稿に登録するタグを入力してください';
  quickPick.placeholder   = '例) Rails React Mastodon';

  quickPick.onDidChangeValue(async (value: string) => {
    quickPick.busy       = true;
    const suggestedItems = await suggestTags(value);
    quickPick.busy       = false;

    quickPick.items         = quickPick.selectedItems.concat(suggestedItems);
    quickPick.selectedItems = quickPick.selectedItems;
  });

  return quickPick;
}
