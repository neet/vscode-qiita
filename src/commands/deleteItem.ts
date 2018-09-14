import { client } from '../client';

export async function deleteItem (id: string) {
  return await client.deleteItem(id);
}
