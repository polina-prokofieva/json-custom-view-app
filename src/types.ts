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
  keysForArrays?: object;
  arraysAsTable?: string[];
  showNotifications?: boolean;
}
