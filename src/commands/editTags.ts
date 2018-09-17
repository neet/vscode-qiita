import { QuickPickItem } from 'vscode';
import { window } from 'vscode';
import { Item } from '../../../qiita-js-2';
import { client } from '../client';
import { makeQuickPickItemFromTag, tagsPicker } from '../quicks/tagPicker';

const updater = async (item: Item, selectedItems: ReadonlyArray<QuickPickItem>) => {
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
  const { tags } = arg.item;

  const selectedItems = await Promise.all(tags.map(async (tagging) => {
    const tag = await client.fetchTag(tagging.name);
    const item = makeQuickPickItemFromTag(tag.id, tag.followers_count);
    return item;
  }));

  const input = tagsPicker(selectedItems);

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
