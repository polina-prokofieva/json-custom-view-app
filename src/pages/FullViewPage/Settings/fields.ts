import { FC } from 'react';
import Checkbox from '../../../components/forms/Checkbox/Checkbox';
import DoubleTextField from '../../../components/forms/DoubleTextField/DoubleTextField';
import KeyAndValueField from '../../../components/forms/KeyAndValueField/KeyAndValueField';
import ListField from '../../../components/forms/ListField/ListField';
import PathField from '../../../components/forms/PathField/PathField';
import TextField from '../../../components/forms/TextField/TextField';

export interface FieldType {
  description?: string;
  Component: FC<any>;
  placeholder?: string;
}

export interface SettingsFieldsType {
  [key: string]: FieldType;
}

export const settingsFields: SettingsFieldsType = {
  root: {
    description: '',
    Component: PathField,
  },
  isFormatKeys: {
    description: 'format keys',
    Component: Checkbox,
  },
  nullAppearence: {
    description: 'change null to this value',
    Component: TextField,
  },
  boolAppearence: {
    description: 'change booleans to this values',
    Component: DoubleTextField,
  },
  hidePropertiesByValue: {
    description: 'fields with these values will not be visible',
    Component: ListField,
    placeholder: 'Ex: name',
  },
  hidePropertiesByKey: {
    description: 'fields with these keys will not be visible',
    Component: ListField,
    placeholder: 'Ex: empty',
  },
  hideEmpty: {
    description: 'hide empty objects and arrays',
    Component: Checkbox,
  },
  isMergeSingleFields: {
    description: 'merge single fields to one',
    Component: Checkbox,
  },
  keysForArrays: {
    description: 'change numeric keys for array to keys from values',
    Component: KeyAndValueField,
  },
  arraysAsTable: {
    description: '',
    Component: ListField,
    placeholder: 'Ex: accounts',
  },
  showNotifications: {
    description: 'errors and warning',
    Component: Checkbox,
  },
};
