import { Qiita } from '../../qiita-js-2';
import { configuration } from './configuration';

export const client = new Qiita({
  token: configuration.token || '',
});
