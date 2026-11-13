import { openDB } from 'idb';
import type { LocalDatabaseSchema } from './database.types';

export const localDatabasePromise =
  openDB<LocalDatabaseSchema>(
    'json-custom-view-local',
    1,
    {
      upgrade(db) {
        db.createObjectStore('localData');
      },
    },
  );
