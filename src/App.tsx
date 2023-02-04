import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { dataExample } from '../data/big';
import FullViewPage from './pages/FullViewPage/FullViewPage';
import PutStringPage from './pages/PutStringPage/PutStringPage';
import StartPage from './pages/StartPage/StartPage';
import UploadFilePage from './pages/UploadFilePage/UploadFilePage';
import { SettingsType } from './types';
import './App.scss';

const App = () => {
  const [data, setData] = useState<string | null>(dataExample);
  const [settings, setSettings] = useState<SettingsType>({});

  return (
    <Router>
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/start' element={<StartPage />} />
        <Route
          path='/upload-json-file'
          element={<UploadFilePage setData={setData} />}
        />
        <Route
          path='/put-json-string'
          element={<PutStringPage setData={setData} />}
        />
        <Route
          path='/full-view'
          element={
            data && (
              <FullViewPage
                data={data}
                settings={settings}
                setSettings={setSettings}
              />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
