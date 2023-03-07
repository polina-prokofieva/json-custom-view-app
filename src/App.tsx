import { useState } from 'react';
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
import './App.scss';

const App = () => {
  const [data, setData] = useState<string | null>(null);
  const [settings, setSettings] = useState<SettingsType>({});

  return (
    <Router>
      <Routes>
        <Route path={`/${PROJECT_NAME}/`} element={<StartPage />} />
        <Route path={`/${PROJECT_NAME}/start`} element={<StartPage />} />
        <Route
          path={`/${PROJECT_NAME}/upload-json-file`}
          element={<UploadFilePage setData={setData} />}
        />
        <Route
          path={`/${PROJECT_NAME}/put-json-string`}
          element={<PutStringPage setData={setData} />}
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
