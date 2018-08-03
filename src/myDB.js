import Dexie from 'dexie';

const db = new Dexie('myDB');
db.version(1).stores({ notes: '++id,text,date' });

export default db;
