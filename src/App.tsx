import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import FullViewPage from './pages/FullViewPage/FullViewPage';
import PutStringPage from './pages/PutStringPage/PutStringPage';
import StartPage from './pages/StartPage/StartPage';
import UploadFilePage from './pages/UploadFilePage/UploadFilePage';
import { SettingsType } from 'json-custom-view';

import { localPersistenceService } from './services/persistence/local/service';
import { useJsonStore } from './store/useJsonStore';

import './App.scss';
import { Spinner } from './components/Spinner/Spinner';

const App = () => {
  const mainJson = useJsonStore((state) => state.mainJson);
  const loadMainJson = useJsonStore((state) => state.loadMainJson);
  const [settings, setSettings] = useState<SettingsType>({});

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [, settingsJson] = await Promise.all([
          loadMainJson(),
          localPersistenceService.loadSettingsJson(),
        ]);

        if (!isMounted) return;

        setSettings(settingsJson ?? {});
      } catch (error) {
        console.error('Failed to load local data:', error);

        if (isMounted) {
          setLoadError('Failed to load local data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [loadMainJson]);

  const saveSettings = async (settingsToSave: SettingsType) => {
    try {
      await localPersistenceService.saveSettingsJson(settingsToSave);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  useEffect(() => {
    if (isLoading) return;
    saveSettings(settings);
  }, [settings, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path={`/${PROJECT_NAME}`}
          element={<StartPage isSavedDataExists={!!mainJson} />}
        />
        <Route
          path={`/${PROJECT_NAME}/`}
          element={<StartPage isSavedDataExists={!!mainJson} />}
        />
        <Route
          path={`/${PROJECT_NAME}/start`}
          element={<StartPage isSavedDataExists={!!mainJson} />}
        />

        <Route
          path={`/${PROJECT_NAME}/upload-json-file`}
          element={<UploadFilePage />}
        />
        <Route
          path={`/${PROJECT_NAME}/put-json-string`}
          element={<PutStringPage />}
        />
        <Route
          path={`/${PROJECT_NAME}/full-view`}
          element={
            mainJson ? (
              <FullViewPage
                settings={settings}
                setSettings={setSettings}
              />
            ) : (
              <Navigate replace to={`/${PROJECT_NAME}/`} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
