import { useCallback, useEffect, useState } from 'react';
import { localPersistenceService } from '../services/persistence/local/service';
import { SettingsType } from 'json-custom-view';

interface LocalData {
  mainJson: unknown;
  settingsJson: unknown;
}

interface UseLocalPersistenceResult extends LocalData {
  isLoading: boolean;
  error: Error | null;
  saveMainJson: (data: string | null) => Promise<void>;
  saveSettingsJson: (data: SettingsType) => Promise<void>;
}

export function useLocalPersistence(): UseLocalPersistenceResult {
  const [mainJson, setMainJson] = useState<string | null>(null);
  const [settingsJson, setSettingsJson] = useState<SettingsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [main, settings] = await Promise.all([
          localPersistenceService.loadMainJson(),
          localPersistenceService.loadSettingsJson(),
        ]);

        setMainJson(main ?? null);
        setSettingsJson(settings ?? null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Loading failed'));
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, []);

  const saveMainJson = useCallback(async (data: string | null) => {
    try {
      await localPersistenceService.saveMainJson(data);
      setMainJson(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Saving failed'));
      throw err;
    }
  }, []);

  const saveSettingsJson = useCallback(async (data: SettingsType) => {
    try {
      await localPersistenceService.saveSettingsJson(data);
      setSettingsJson(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Saving failed'));
      throw err;
    }
  }, []);

  return {
    mainJson,
    settingsJson,
    isLoading,
    error,
    saveMainJson,
    saveSettingsJson,
  };
}
