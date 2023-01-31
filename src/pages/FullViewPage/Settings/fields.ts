export interface FieldType {
  description?: string;
  inputType: 'checkbox' | 'text' | 'twoTextFields' | 'listOfStrings';
}

export interface SettingsFieldsType {
  [key: string]: FieldType;
}

export const settingsFields: SettingsFieldsType = {
  // root: {
  //   description: '',
  //   inputType: '',
  // },
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
  },
  hidePropertiesByKey: {
    description: 'fields with these keys will not be visible',
    inputType: 'listOfStrings',
  },
  hideEmpty: {
    description: 'hide empty objects and arrays',
    inputType: 'checkbox',
  },
  isMergeSingleFields: {
    description: 'merge single fields to one',
    inputType: 'checkbox',
  },
  // keysForArrays: {
  //   description: 'change numeric keys for array to keys from values',
  //   inputType: '',
  // },
  arraysAsTable: {
    description: '',
    inputType: 'listOfStrings',
  },
  showNotifications: {
    description: '',
    inputType: 'checkbox',
  },
};
