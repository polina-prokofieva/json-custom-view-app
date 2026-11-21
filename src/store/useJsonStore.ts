import { create } from 'zustand';
import { persistenceService } from '../services/persistence';

type State = {
  mainJson: string | null;
};

type Actions = {
  loadMainJson: () => Promise<void>;
  saveMainJson: (data: string | null) => Promise<boolean>;
};

type JsonStore = State & Actions;

export const useJsonStore = create<JsonStore>()((set) => ({
  mainJson: null,

  loadMainJson: async () => {
    const mainJson = await persistenceService.loadMainJson();
    set({ mainJson });
  },

  saveMainJson: async (data) => {
    try {
      await persistenceService.saveMainJson(data);
      set({ mainJson: data });
      return true;
    } catch (error) {
      console.error('Failed to save JSON:', error);
      return false;
    }
  },
}));
