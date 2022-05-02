import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import ObjectID from 'bson-objectid';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  private db: IDBPDatabase<MyDB>;

  constructor() {
    this.connectToDb();
  }

  async connectToDb(): Promise<void> {
    this.db = await openDB<MyDB>('my-db', 1, {
      upgrade(db) {
        db.createObjectStore('user-store');
      }
    });

    if (this.db) {
      console.log(`Getting data from IndexedDB`);
      this.getData().then(console.log);
    }
  }

  addUser(user: any): any {
    user = typeof user === 'string' ? JSON.stringify(user) : user;
    // indexedDB only accepts strings
    return this.db.put('user-store', user, 'user');
  }

  getData(): Promise<any> {
    return new Promise((resolve) => {
      const transaction = this.db.transaction(['user-store']);
      const objStore = transaction.objectStore('user-store');
      const request = objStore.getAll(); //objStore.get('user');
      request.then((data) => {
        if (data) {
          resolve(data);
        }
      });
    });
  }
}

interface MyDB extends DBSchema {
  'user-store': {
    key: string,
    value: string;
  };
}