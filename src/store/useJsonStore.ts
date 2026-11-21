import { create } from 'zustand';
import { persistenceService } from '../services/persistence';

type State = {
  mainJson: string | null;
  saveError: string | null;
};

type Actions = {
  loadMainJson: () => Promise<void>;
  saveMainJson: (data: string | null) => Promise<boolean>;
  clearSaveError: () => void;
};

type JsonStore = State & Actions;

export const useJsonStore = create<JsonStore>()((set) => ({
  mainJson: null,
  saveError: null,

  loadMainJson: async () => {
    const mainJson = await persistenceService.loadMainJson();
    set({ mainJson });
  },

  saveMainJson: async (data) => {
    set({ saveError: null });

    try {
      await persistenceService.saveMainJson(data);
      set({ mainJson: data });
      return true;
    } catch (error) {
      console.error('Failed to save JSON:', error);
      set({ saveError: 'Failed to save JSON. Please try again.' });
      return false;
    }
  },

  clearSaveError: () => set({ saveError: null }),
}));
