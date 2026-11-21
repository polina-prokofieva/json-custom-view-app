import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persistenceService } from '../services/persistence';
import { SettingsType } from 'json-custom-view';

type State = {
  mainJson: string | null;
  settings: SettingsType | null;
};

type Actions = {
  loadMainJson: () => Promise<void>;
  saveMainJson: (data: string | null) => Promise<boolean>;

  loadSettings: () => Promise<void>;
  saveSettings: (settings: SettingsType | null) => Promise<boolean>;
};

type JsonStore = State & Actions;

export const useJsonStore = create<JsonStore>()(
  devtools(
    (set) => ({
      mainJson: null,
      settings: null,

      loadMainJson: async () => {
        const mainJson = await persistenceService.loadMainJson();
        set({ mainJson }, undefined, 'loadMainJson');
      },

      saveMainJson: async (data) => {
        try {
          await persistenceService.saveMainJson(data);
          set({ mainJson: data }, undefined, 'saveMainJson');
          return true;

        } catch (error) {
          console.error('Failed to save JSON:', error);
          return false;
        }
      },

      loadSettings: async () => {
        const settings = await persistenceService.loadSettings();
        set({ settings }, undefined, 'loadSettings');
      },

      saveSettings: async (settings) => {
        try {
          await persistenceService.saveSettings(settings);
          set({ settings }, undefined, 'saveSettings');
          return true;

        } catch (error) {
          console.error('Failed to save Settings:', error);
          return false;
        }
      },
    }
    ), { name: 'JsonStore', enabled: import.meta.env.DEV }
  )
);
