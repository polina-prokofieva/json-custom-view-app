import { localDatabasePromise } from './database';

export const localPersistenceService = {
  async saveMainJson(data: unknown) {
    const db = await localDatabasePromise;
    await db.put('localData', data, 'mainJson');
  },

  async loadMainJson() {
    const db = await localDatabasePromise;
    return db.get('localData', 'mainJson');
  },

  async saveSettingsJson(data: unknown) {
    const db = await localDatabasePromise;
    await db.put('localData', data, 'settingsJson');
  },

  async loadSettingsJson() {
    const db = await localDatabasePromise;
    return db.get('localData', 'settingsJson');
  },
};
