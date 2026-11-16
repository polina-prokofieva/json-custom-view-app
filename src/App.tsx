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

import './App.scss';
import { Spinner } from './components/Spinner/Spinner';

const App = () => {
  const [data, setData] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsType>({});

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [mainJson, settingsJson] = await Promise.all([
          localPersistenceService.loadMainJson(),
          localPersistenceService.loadSettingsJson(),
        ]);

        if (!isMounted) return;

        setData(typeof mainJson === 'string' ? mainJson : null);
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
  }, []);

  const saveData = async (dataToSave: string | null) => {
    setData(dataToSave);

    try {
      await localPersistenceService.saveMainJson(dataToSave);
    } catch (error) {
      console.error('Failed to save JSON:', error);
    }
  }

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
        <Route path={`/${PROJECT_NAME}/`} element={<StartPage />} />
        <Route path={`/${PROJECT_NAME}/start`} element={<StartPage />} />
        <Route
          path={`/${PROJECT_NAME}/upload-json-file`}
          element={<UploadFilePage setData={saveData} />}
        />
        <Route
          path={`/${PROJECT_NAME}/put-json-string`}
          element={<PutStringPage setData={saveData} />}
        />
        <Route
          path={`/${PROJECT_NAME}/full-view`}
          element={
            data ? (
              <FullViewPage
                data={data}
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
