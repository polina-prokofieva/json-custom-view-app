import { SettingsType } from 'json-custom-view';

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
  if (type === 'object') return convertSettingsToString(value, 2);

  return `${value}`;
};

export const convertSettingsToString = (
  settings: SettingsType,
  level = 1
): string => {
  const prevGap = '  '.repeat(level - 1);
  return (
    Object.keys(settings).reduce((acc, key, idx) => {
      const comma = idx === 0 ? '' : ',';
      const gap = '  '.repeat(level);
      const field = settings[key]
        ? `${comma}\n${gap}"${key}": ${convertValueToString(settings[key])}`
        : '';

      return `${acc}${field}`;
    }, '{') + `\n${prevGap}}`
  );
};
