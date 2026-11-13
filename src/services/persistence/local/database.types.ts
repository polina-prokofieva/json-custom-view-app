import type { DBSchema } from 'idb';

export interface LocalDatabaseSchema extends DBSchema {
  localData: {
    key: 'mainJson' | 'settingsJson';
    value: unknown;
  };
}

