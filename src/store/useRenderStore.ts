import { create } from "zustand";
import { devtools } from 'zustand/middleware';
import { GenerateResultType } from "json-custom-view";

type State = GenerateResultType;

type Actions = {
  update: (result: GenerateResultType) => void;
};

type RenderStore = State & Actions;

export const useRenderStore = create<RenderStore>()(
  devtools(
    (set, get) => ({
      isRendered: false,
      errors: [],

      update: (result) => set((state) => (result), undefined, 'update'),
    }),
    { name: 'RenderStore', enabled: import.meta.env.DEV }
  )
);
