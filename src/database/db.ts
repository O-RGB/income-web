// lib/db.ts
import { openDB } from "idb";

const DB_NAME = "my-incomes";
const DB_VERSION = 1;

export async function getDB(store_name: string) {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(store_name)) {
        db.createObjectStore(store_name);
      }
    },
  });
}
