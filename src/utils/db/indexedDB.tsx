// utils/indexedDB.ts

import { openDB, DBSchema, IDBPDatabase } from "idb";

interface MyDB extends DBSchema {
  "my-store": {
    key: number;
    value: string;
  };
}

export async function openMyDB() {
  return await openDB<MyDB>("my-database", 1, {
    upgrade(db) {
      db.createObjectStore("my-store", { keyPath: "key" });
    },
  });
}
