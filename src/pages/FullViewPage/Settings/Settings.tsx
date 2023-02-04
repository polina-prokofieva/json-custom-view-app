import { FC, Dispatch, SetStateAction, useState } from 'react';
import { SettingsTabType, SettingsType } from '../../../types';
import SettingsForm from './SettingsForm/SettingsForm';
import SettingsObject from './SettingsObject/SettingsObject';
import SettingsHeader from './SettingsHeader/SettingsHeader';
import styles from './Settings.module.scss';
import { ButtonNavLink } from '../../../components/Button/Button';

interface Props {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const Settings: FC<Props> = ({ settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState<SettingsTabType>('form');

  return (
    <>
      <SettingsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.body}>
        {activeTab === 'form' && (
          <SettingsForm settings={settings} setSettings={setSettings} />
        )}
        {activeTab === 'object' && (
          <SettingsObject settings={settings} setSettings={setSettings} />
        )}
        <ButtonNavLink to='/start' label='Back to Home' />
      </div>
    </>
  );
};

export default Settings;
