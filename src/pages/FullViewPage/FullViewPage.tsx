import { FC, Dispatch, SetStateAction } from 'react';
import GeneratedView from './GeneratedView/GeneratedView';
import Settings from './Settings/Settings';
import { SettingsType } from 'json-custom-view';
import { useJsonStore } from '../../store/useJsonStore';
import styles from './FullViewPage.module.scss';

interface Props {
  settings: object;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const FullViewPage: FC<Props> = ({ settings, setSettings }) => {
  const mainJson = useJsonStore((state) => state.mainJson);

  // App redirects away when there is no data; this guard narrows the type to string.
  if (!mainJson) return null;

  return (
    <div className={styles.FullViewPage}>
      <div className={styles.rendered}>
        <GeneratedView json={mainJson} settings={settings} />
      </div>
      <div className={styles.settings}>
        <Settings settings={settings} setSettings={setSettings} data={mainJson} />
      </div>
    </div>
  );
};

export default FullViewPage;
