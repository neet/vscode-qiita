import { Item } from 'qiita-js-2';
import { QuickPickItem } from 'vscode';
import { window } from 'vscode';
import { client } from '../client';
import { makeQuickPickItemFromTag, tagQuickPickCreator } from '../quickpicks/tagQuickPickCreator';

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
      await updater(item, input.selectedItems);
      window.showInformationMessage('タグを編集しました');
      input.hide();
    } catch (error) {
      window.showErrorMessage(error.toString());
    }
  });
}
