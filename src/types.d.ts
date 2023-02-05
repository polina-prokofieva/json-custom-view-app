export interface keysForArraysType {
  [key: string]: string;
}

export interface SettingsType {
  [key: string]: any;
  root?: string | string[];
  isFormatKeys?: boolean;
  nullAppearence?: string;
  boolAppearence?: [string, string];
  hidePropertiesByValue?: string[];
  hidePropertiesByKey?: string[];
  hideEmpty?: boolean;
  isMergeSingleFields?: boolean;
  keysForArrays?: keysForArraysType;
  arraysAsTable?: string[];
  showNotifications?: boolean;
}

export type SettingsTabType = 'form' | 'object';
