import { FC, ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';
import Checkbox from '../../../../components/forms/Checkbox/Checkbox';
import TextField from '../../../../components/forms/TextField/TextField';
import DoubleTextField from '../../../../components/forms/DoubleTextField/DoubleTextField';
import ListField from '../../../../components/forms/ListField/ListField';
import { SettingsType } from 'json-custom-view';
import { settingsFields } from '../fields';
import styles from './SettingsForm.module.scss';
import KeyAndValueField from '../../../../components/forms/KeyAndValueField/KeyAndValueField';
import PathField from '../../../../components/forms/PathField/PathField';

interface Props {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const SettingsForm: FC<Props> = ({ settings, setSettings }) => {
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
      const { inputType, description, placeholder } = settingsFields[value];

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
            placeholder={placeholder}
          />
        );
      }

      if (inputType === 'object') {
        return (
          <KeyAndValueField
            key={value}
            name={value}
            description={description}
            setSettings={setSettings}
            wholeValue={settings[value]}
          />
        );
      }

      if (inputType === 'path') {
        return (
          <PathField
            key={value}
            name={value}
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
    <form className={styles.SettingsForm} onChange={handleChange}>
      {settingsFieldNames.map(renderField)}
    </form>
  );
};

export default SettingsForm;
