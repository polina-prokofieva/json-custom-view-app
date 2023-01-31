import { FC, Dispatch, SetStateAction, ChangeEvent, useCallback } from 'react';
import { SettingsType } from '../../../types';
import Checkbox from '../../../components/forms/Checkbox/Checkbox';
import TextField from '../../../components/forms/TextField/TextField';
import { settingsFields } from './fields';
import styles from './Settings.module.scss';
import DoubleTextField from '../../../components/forms/DoubleTextField/DoubleTextField';
import ListField from '../../../components/forms/ListField/ListField';

interface Props {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const Settings: FC<Props> = ({ settings, setSettings }) => {
  const settingsFieldNames = Object.keys(settingsFields);

  const handleChange = (evt: ChangeEvent<HTMLFormElement>) => {
    const { name, checked, value } = evt.target;

    if (settingsFields[name]) {
      const { inputType } = settingsFields[name];

      if (inputType === 'checkbox') {
        setSettings((prev: SettingsType) => ({ ...prev, [name]: checked }));
      } else if (inputType === 'text') {
        setSettings((prev: SettingsType) => ({ ...prev, [name]: value }));
      }
    }
  };

  const renderField = useCallback(
    (value: string): JSX.Element => {
      const { inputType, description } = settingsFields[value];

      if (inputType === 'checkbox') {
        return (
          <Checkbox
            key={value}
            value={value}
            checked={settings[value]}
            description={description}
          />
        );
      }

      if (inputType === 'text') {
        return (
          <TextField value={value} description={description} key={value} />
        );
      }

      if (inputType === 'twoTextFields') {
        return (
          <DoubleTextField
            key={value}
            name={value}
            description={description}
            labels={['false', 'true']}
            initialValues={settings[value]}
            setSettings={setSettings}
          />
        );
      }

      if (inputType === 'listOfStrings') {
        return (
          <ListField
            key={value}
            name={value}
            description={description}
            value={settings[value]}
            setSettings={setSettings}
          />
        );
      }

      return <></>;
    },
    [settings, setSettings]
  );

  return (
    <>
      <h4 className={styles.settingsHeader}>Settings</h4>
      <form className={styles.Settings} onChange={handleChange}>
        {settingsFieldNames.map(renderField)}
      </form>
    </>
  );
};

export default Settings;
