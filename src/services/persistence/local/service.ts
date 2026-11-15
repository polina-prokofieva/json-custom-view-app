import { SettingsType } from 'json-custom-view';
import { localDatabasePromise } from './database';

export const localPersistenceService = {
  async saveMainJson(data: string | null) {
    const db = await localDatabasePromise;
    await db.put('localData', data, 'mainJson');
  },

  async loadMainJson() {
    const db = await localDatabasePromise;
    return db.get('localData', 'mainJson');
  },

  async saveSettingsJson(data: SettingsType) {
    const db = await localDatabasePromise;
    await db.put('localData', data, 'settingsJson');
  },

  async loadSettingsJson() {
    const db = await localDatabasePromise;
    return db.get('localData', 'settingsJson');
  },
};
