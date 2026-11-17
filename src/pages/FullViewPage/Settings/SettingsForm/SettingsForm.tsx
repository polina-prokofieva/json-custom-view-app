import { FC, ChangeEvent, Dispatch, SetStateAction, useCallback, JSX } from 'react';
import { SettingsType } from 'json-custom-view';
import { SettingsFieldName, settingsFields } from '../fields';
import styles from './SettingsForm.module.scss';
import SettingField from '../SettingField/SettingField';
import Checkbox from '../../../../components/forms/Checkbox/Checkbox';
import TextField from '../../../../components/forms/TextField/TextField';
import DoubleTextField from '../../../../components/forms/DoubleTextField/DoubleTextField';
import ListField from '../../../../components/forms/ListField/ListField';
import PathField from '../../../../components/forms/PathField/PathField';
import KeyAndValueField from '../../../../components/forms/KeyAndValueField/KeyAndValueField';

interface Props {
  settings: SettingsType;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const SettingsForm: FC<Props> = ({ settings, setSettings }) => {
  const settingsFieldNames = Object.keys(settingsFields) as SettingsFieldName[];

  const handleChange = (evt: ChangeEvent<HTMLFormElement>) => {
    const { name, checked, value } = evt.target;

    if (settingsFields[name as SettingsFieldName]) {
      const { Component } = settingsFields[name as SettingsFieldName];

      if (Component === Checkbox) {
        setSettings((prev: SettingsType) => ({ ...prev, [name]: checked }));
      } else if (Component === TextField) {
        setSettings((prev: SettingsType) => ({ ...prev, [name]: value }));
      }
    }
  };

  const renderField = useCallback(
    (value: SettingsFieldName): JSX.Element => {
      const { Component, description, placeholder = null } = settingsFields[value];

      const commonProps: object = {
        Component,
        description,
        placeholder,
        key: value,
      };

      let props: object;

      if (Component === Checkbox) {
        props = { value, checked: settings[value] };
      } else if (Component === TextField) {
        props = { value, current: settings[value] ?? '' };
      } else {
        props = { setSettings, name: value };
      }

      if (Component === DoubleTextField) {
        props = {
          ...props,
          labels: ['false', 'true'],
          initialValues: settings[value],
        };
      }

      if (Component === ListField || Component === PathField) {
        props = { ...props, value: settings[value] };
      }

      if (Component === KeyAndValueField) {
        props = { ...props, wholeValue: settings[value] };
      }

      props = { ...commonProps, ...props };

      return <SettingField description={description} {...props} />;
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
