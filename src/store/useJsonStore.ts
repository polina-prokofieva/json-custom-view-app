import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persistenceService } from '../services/persistence';

type State = {
  mainJson: string | null;
};

type Actions = {
  loadMainJson: () => Promise<void>;
  saveMainJson: (data: string | null) => Promise<boolean>;
};

type JsonStore = State & Actions;

export const useJsonStore = create<JsonStore>()(
  devtools(
    (set) => ({
      mainJson: null,

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
    }
    ), { name: 'JsonStore', enabled: import.meta.env.DEV }
  )
);
