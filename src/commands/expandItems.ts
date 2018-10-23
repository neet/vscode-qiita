import { qiitaItemsProvider } from '../explorers/qiitaItems';
import { handleErrorMessage } from '../utils/errorHandler';

export async function expandItems () {
  try {
    if (!qiitaItemsProvider.done) {
      await qiitaItemsProvider.expandItems();
    }
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.warn(error);

    handleErrorMessage(error);
  }
}
