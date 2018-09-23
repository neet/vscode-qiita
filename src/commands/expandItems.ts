import { qiitaItemsProvider } from '../explorers/qiitaItems';
import { itemsStore } from '../stores/itemsStore';

export async function expandItems () {
  try {
    if (!itemsStore.done) {
      await itemsStore.expandItems();
      qiitaItemsProvider.refresh();
    }
  } catch (e) {
    console.error(e);
  }
}
