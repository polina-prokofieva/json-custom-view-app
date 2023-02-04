import { SettingsType } from '../types';

const convertArrayToString = (
  value: (string | null | boolean | number | object)[]
): string => {
  let converted = value.reduce((acc, item, idx) => {
    const comma = idx !== 0 ? ', ' : '';
    return `${acc}${comma}${convertValueToString(item)}`;
  }, '');
  return `[${converted}]`;
};

const convertValueToString = (value: any): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return convertArrayToString(value);

  const type = typeof value;

  if (type === 'string') return `"${value}"`;
  if (type === 'boolean') return `${value}`;

  return `${value}`;
};

export const convertSettingsToString = (settings: SettingsType): string => {
  return (
    Object.keys(settings).reduce((acc, key, idx) => {
      const comma = idx === 0 ? '' : ',';
      const field = settings[key]
        ? `${comma}\n  "${key}": ${convertValueToString(settings[key])}`
        : '';

      return `${acc}${field}`;
    }, '{') + '\n}'
  );
};
