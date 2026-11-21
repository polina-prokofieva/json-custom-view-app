import { SettingsType } from 'json-custom-view';
import { localDatabasePromise } from './database';

export const localPersistenceService = {
  async saveMainJson(data: string | null) {
    const db = await localDatabasePromise;
    await db.put('localData', data, 'mainJson');
  },

  async loadMainJson(): Promise<string | null> {
    const db = await localDatabasePromise;
    const value = await db.get('localData', 'mainJson');
    return typeof value === 'string' ? value : null;
  },

  async saveSettings(data: SettingsType) {
    const db = await localDatabasePromise;
    await db.put('localData', data, 'settingsJson');
  },

  async loadSettings() {
    const db = await localDatabasePromise;
    return db.get('localData', 'settingsJson');
  },
};
