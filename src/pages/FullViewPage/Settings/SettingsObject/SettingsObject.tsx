import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { SettingsType } from '../../../../types';
import { convertSettingsToString } from '../../../../utils/settings';
import styles from './SettingsObject.module.scss';

interface Props {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const SettingsObject: FC<Props> = ({ settings, setSettings }) => {
  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const newSettings = JSON.parse(evt.target.value);
      setSettings(newSettings);
    } catch (error) {
      // console.error(error.message);
    }
  };

  return (
    <form className={styles.SettingsObject}>
      <textarea
        name='settings'
        id='settings'
        cols={30}
        rows={10}
        value={convertSettingsToString(settings)}
        onChange={handleChange}
      />
    </form>
  );
};

export default SettingsObject;
