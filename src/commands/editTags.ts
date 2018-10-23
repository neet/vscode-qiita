import { Item } from 'qiita-js-2';
import { QuickPickItem, window } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import { qiitaItemsProvider } from '../explorers/qiitaItems';
import { makeQuickPickItemFromTag, tagQuickPickCreator, validateTagQuickPick } from '../quickpicks/tagQuickPick';
import { handleErrorMessage } from '../utils/errorHandler';

const localize = nls.loadMessageBundle();

export const updater = async (item: Item, selectedItems: ReadonlyArray<QuickPickItem>) => {
  const taggings = selectedItems.map((item) => ({
    name: item.label,
    versions: [],
  }));

  await client.updateItem(item.id, {
    tags: taggings,
    title: item.title,
    body: item.body,
  });
};

/**
 * タグを編集するためのquickPickを作成
 * @param resource コマンドから渡される引数
 */
export async function editTags (resource: { item: Item }) {
  const { item } = resource;
  const taggings = resource.item.tags;

  // 既存のタグを取得してselectedItemsとして初期化
  const selectedItems = await Promise.all(taggings.map(async (tagging) => {
    const tag = await client.fetchTag(tagging.name);
    return makeQuickPickItemFromTag(tag.id, tag.followers_count);
  }));

  const quickPick = tagQuickPickCreator(selectedItems);

  quickPick.onDidAccept(async () => {
    if (!validateTagQuickPick(quickPick)) {
      return window.showErrorMessage(localize(
        'quickpicks.tagQuickPick.failure.validationError',
        'タグは1つ以上5つ以内で選択してください。',
      ));
    }

    try {
      quickPick.hide();
      await updater(item, quickPick.selectedItems);
      await qiitaItemsProvider.refreshItems();

      return window.showInformationMessage(localize(
        'commands.editTags.success',
        'タグを編集しました',
      ));
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.warn(error);

      return handleErrorMessage(error);
    }
  });

  quickPick.show();
}
