import { qiitaItemsProvider } from '../explorers/qiitaItems';

export async function expandItems () {
  try {
    if (!qiitaItemsProvider.done) {
      await qiitaItemsProvider.expandItems();
    }
  } catch (e) {
    console.error(e);
  }
}
