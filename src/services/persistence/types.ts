export interface PersistenceService {
  loadMainJson(): Promise<string | null>;
  saveMainJson(data: string | null): Promise<void>;
}
