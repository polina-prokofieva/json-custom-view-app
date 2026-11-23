import { FC, useState } from 'react';
import { transform } from 'json-custom-view';
import { SettingsTabType } from '../../../types';
import SettingsForm from './SettingsForm/SettingsForm';
import SettingsObject from './SettingsObject/SettingsObject';
import SettingsHeader from './SettingsHeader/SettingsHeader';
import styles from './Settings.module.scss';
import Button, { ButtonNavLink } from '../../../components/Button/Button';
import { download } from '../../../utils/downloadFile';
import { useJsonStore } from '../../../store/useJsonStore';

interface Props {
  data: string;
}

const Settings: FC<Props> = ({ data }) => {
  const settings = useJsonStore((state) => state.settings);

  const [activeTab, setActiveTab] = useState<SettingsTabType>('form');
  const handleClick = () => {
    const transformed = transform(JSON.parse(data), settings);
    download('transformed.json', JSON.stringify(transformed));
  };

  return (
    <>
      <SettingsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.body}>
        {activeTab === 'form' && (
          <SettingsForm />
        )}
        {activeTab === 'object' && (
          <SettingsObject />
        )}
        <div className={styles.buttons}>
          <ButtonNavLink to='/start' label='Back to Home' />
          <Button
            type='button'
            label='Get transformed JSON'
            handleClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default Settings;
