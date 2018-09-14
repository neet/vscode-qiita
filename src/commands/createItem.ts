import { client } from '../client';
import { configuration } from '../configuration';

export async function createItem (title: string, body: string, private = false) {
  return await client.createItem({
    title,
    body,
    coediting: false,
    tags: [],
    private,
    gist: configuration.gistOnCreateItem || false,
    tweet: configuration.tweetOnCreateItem || false,
  });
}
