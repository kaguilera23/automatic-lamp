import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
  const todosDb = await openDB('text', 1);
  const tx = todosDb.transaction('text', 'readwrite');
  const store = tx.objectStore('text');
  const request = store.put({ id: id, text: content });
  const result = await request;
  console.log('data saved to the database', result);    
  } catch {
    console.error('putDb not implemented');  
  }
}

export const getDb = async () => {
  try {
  const textDb = await openDB('text', 1);
  const tx = textDb.transaction('text', 'readonly');
  const store = tx.objectStore("text");
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;    
  } catch {
  console.error('getDb not implemented');
  }
}


initdb();
