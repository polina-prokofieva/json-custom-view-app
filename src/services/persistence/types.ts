import { SettingsType } from "json-custom-view";

export interface PersistenceService {
  loadMainJson(): Promise<string | null>;
  saveMainJson(data: string | null): Promise<void>;
  loadSettings(): Promise<SettingsType>;
  saveSettings(settings: SettingsType): Promise<void>;
}
