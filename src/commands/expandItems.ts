import { qiitaItemsProvider } from '../explorers/qiitaItems';
import { handleErrorMessage } from '../utils/errorHandler';

export async function expandItems () {
  try {
    if (!qiitaItemsProvider.done) {
      await qiitaItemsProvider.expandItems();
    }
  } catch (error) {
    handleErrorMessage(error);
  }
}
