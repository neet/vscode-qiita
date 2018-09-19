import { Item } from 'qiita-js-2';
import { QuickPickItem, window } from 'vscode';
import * as nls from 'vscode-nls';
import { client } from '../client';
import { makeQuickPickItemFromTag, tagQuickPickCreator } from '../quickpicks/tagQuickPickCreator';
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
 * @param arg コマンドから渡される引数
 */
export async function editTags (arg: object & { item: Item }) {
  const { item } = arg;
  const { tags: taggings } = arg.item;

  const selectedItems = await Promise.all(taggings.map(async (tagging) => {
    const tag = await client.fetchTag(tagging.name);
    return makeQuickPickItemFromTag(tag.id, tag.followers_count);
  }));

  const input = tagQuickPickCreator(selectedItems);

  input.show();

  input.onDidAccept(async () => {
    try {
      input.hide();
      await updater(item, input.selectedItems);

      return window.showInformationMessage(localize(
        'commands.qiita.editTags.success',
        'タグを編集しました',
      ));
    } catch (error) {
      return handleErrorMessage(error);
    }
  });
}
