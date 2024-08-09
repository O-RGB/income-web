// lib/db.ts
import { openDB } from "idb";

const DB_NAME = "my-incomes";
const DB_VERSION = 1;

// เพิ่ม function สำหรับการ upgrade version
async function upgradeDB(store_name: string) {
  const db = await openDB(DB_NAME);

  // ถ้าร้านค้ายังไม่มีอยู่ จะทำการเพิ่ม version ของ database และสร้าง store ใหม่
  if (!db.objectStoreNames.contains(store_name)) {
    const newVersion = db.version + 1;
    db.close();

    return openDB(DB_NAME, newVersion, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(store_name)) {
          db.createObjectStore(store_name);
        }
      },
    });
  }
  return db;
}

export async function getDB(store_name: string) {
  return upgradeDB(store_name);
  // return openDB(DB_NAME, DB_VERSION, {
  //   upgrade(db) {
  //     if (!db.objectStoreNames.contains(store_name)) {
  //       db.createObjectStore(store_name);
  //     }
  //   },
  // });
}
