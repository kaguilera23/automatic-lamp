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
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ id: id, text: content });
  const result = await request;
  console.log('data saved to the database', result);    
  } catch {
    console.error('putDb not implemented');  
  }
}

export const getDb = async () => {
  try {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;    
  } catch {
  console.error('getDb not implemented');
  }
}


initdb();
