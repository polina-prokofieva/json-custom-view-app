import { FC, Dispatch, SetStateAction } from 'react';
import GeneratedView from './GeneratedView/GeneratedView';
import Settings from './Settings/Settings';
import { SettingsType } from '../../types';
import styles from './FullViewPage.module.scss';

interface Props {
  data: string;
  settings: object;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const FullViewPage: FC<Props> = ({ data, settings, setSettings }) => {
  return (
    <div className={styles.FullViewPage}>
      <div className={styles.rendered}>
        {data && <GeneratedView json={data} settings={settings} />}
      </div>
      <div className={styles.settings}>
        <Settings settings={settings} setSettings={setSettings} data={data} />
      </div>
    </div>
  );
};

export default FullViewPage;
