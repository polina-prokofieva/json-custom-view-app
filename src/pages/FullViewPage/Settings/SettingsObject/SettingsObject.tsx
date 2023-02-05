import {
  FC,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react';
import { SettingsType } from '../../../../types';
import { convertSettingsToString } from '../../../../utils/settings';
import styles from './SettingsObject.module.scss';

interface Props {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const SettingsObject: FC<Props> = ({ settings, setSettings }) => {
  const [value, setValue] = useState(convertSettingsToString(settings));

  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  };

  useEffect(() => {
    try {
      const newSettings = JSON.parse(value);
      setSettings(newSettings);
    } catch (error) {
      // console.log(error);
    }
  }, [value]);

  return (
    <form className={styles.SettingsObject}>
      <textarea
        name='settings'
        id='settings'
        cols={30}
        rows={10}
        value={value}
        onChange={handleChange}
      />
    </form>
  );
};

export default SettingsObject;
