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

// Adds logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // Creates a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Creates a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readwrite');

  // Opens up the desired object store.
  const store = tx.objectStore('jate');

  // Uses the .put() method to update data in the database.
  const request = store.put({content});

  // Gets confirmation of the request.
  const result = await request;
  console.log('Updating the database', result);
  return result;
};

// Adds logic for a method that gets all the content from the database
export const getDb = async () => {

  // Creates a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Creates a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readonly');

  // Opens up the desired object store.
  const store = tx.objectStore('jate');

  // Uses the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Gets confirmation of the request.
  const result = await request;
  console.log('result.value', result);
};

initdb();
