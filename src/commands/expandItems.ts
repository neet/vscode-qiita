import { qiitaItemsProvider } from '../explorers/qiitaItems';
import { itemsStore } from '../stores/itemsStore';

export async function expandItems () {
  if (!itemsStore.done) {
    await itemsStore.expandItems();
    qiitaItemsProvider.refresh();
  }
}
