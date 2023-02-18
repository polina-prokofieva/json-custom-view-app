export interface FieldType {
  description?: string;
  inputType:
    | 'checkbox'
    | 'text'
    | 'twoTextFields'
    | 'listOfStrings'
    | 'object'
    | 'path';
  placeholder?: string;
}

export interface SettingsFieldsType {
  [key: string]: FieldType;
}

export const settingsFields: SettingsFieldsType = {
  root: {
    description: '',
    inputType: 'path',
  },
  isFormatKeys: {
    description: 'format keys',
    inputType: 'checkbox',
  },
  nullAppearence: {
    description: 'change null to this value',
    inputType: 'text',
  },
  boolAppearence: {
    description: 'change booleaens to this values',
    inputType: 'twoTextFields',
  },
  hidePropertiesByValue: {
    description: 'fields with these values will not be visible',
    inputType: 'listOfStrings',
    placeholder: 'Ex: name',
  },
  hidePropertiesByKey: {
    description: 'fields with these keys will not be visible',
    inputType: 'listOfStrings',
    placeholder: 'Ex: empty',
  },
  hideEmpty: {
    description: 'hide empty objects and arrays',
    inputType: 'checkbox',
  },
  isMergeSingleFields: {
    description: 'merge single fields to one',
    inputType: 'checkbox',
  },
  keysForArrays: {
    description: 'change numeric keys for array to keys from values',
    inputType: 'object',
  },
  arraysAsTable: {
    description: '',
    inputType: 'listOfStrings',
    placeholder: 'Ex: accounts',
  },
  showNotifications: {
    description: 'errors and warning',
    inputType: 'checkbox',
  },
};
