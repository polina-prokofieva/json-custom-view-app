import {
  FC,
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import { convertSettingsToString } from '../../../../utils/settings';
import styles from './SettingsObject.module.scss';
import { useJsonStore } from '../../../../store/useJsonStore';

const SettingsObject: FC = () => {
  const settings = useJsonStore((state) => state.settings);
  const saveSettings = useJsonStore((state) => state.saveSettings);

  const [value, setValue] = useState(convertSettingsToString(settings));

  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(evt.target.value);
  };

  useEffect(() => {
    try {
      const newSettings = JSON.parse(value);
      saveSettings(newSettings);
    } catch {
      // Ignore invalid JSON while the user is typing
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
