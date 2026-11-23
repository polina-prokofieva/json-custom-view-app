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
import { useJsonStore } from './store/useJsonStore';

import './App.scss';
import { Spinner } from './components/Spinner/Spinner';

const App = () => {
  const mainJson = useJsonStore((state) => state.mainJson);
  const loadMainJson = useJsonStore((state) => state.loadMainJson);
  const loadSettings = useJsonStore((state) => state.loadSettings);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        await Promise.all([loadMainJson(), loadSettings()]);
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
  }, [loadMainJson, loadSettings]);

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
              <FullViewPage />
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
