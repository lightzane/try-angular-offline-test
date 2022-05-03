import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

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
  }

  addUser(user: any): any {
    // indexedDB only accepts strings
    user = typeof user === 'string' ? JSON.stringify(user) : user;
    return this.db.put('user-store', user, uuidv4());
  }

  async getData(): Promise<any[]> {
    await this.connectToDb();
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

  async removeData(): Promise<void> {
    await this.connectToDb();
    // const transaction = this.db.transaction(['user-store']);
    // const objStore = transaction.objectStore('user-store');
    this.db.clear('user-store');
  }
}

interface MyDB extends DBSchema {
  'user-store': {
    key: string,
    value: string;
  };
}