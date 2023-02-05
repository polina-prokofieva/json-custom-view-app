import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useMemo,
} from 'react';
import { keysForArraysType, SettingsType } from '../../../types';
import Button from '../../Button/Button';
import ExistingValueItem from '../ExistingValueItem/ExistingValueItem';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './KeyAndValueField.module.scss';

interface Props {
  name: string;
  wholeValue: keysForArraysType;
  description?: string;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

type FieldType = {
  key?: string;
  pattern?: string;
};

const initialField = {};

const KeyAndValueField: FC<Props> = ({
  name,
  wholeValue,
  description,
  setSettings,
}) => {
  const [field, setField] = useState<FieldType>(initialField);

  const keys = useMemo(
    () =>
      wholeValue && typeof wholeValue === 'object' && Object.keys(wholeValue),
    [wholeValue]
  );

  const handleDeleteItem = (idx: number) => {
    const keyToDelete = !!keys && keys[idx];

    if (keyToDelete) {
      setSettings(prev => {
        const changingObject = { ...prev[name] };
        delete changingObject[keyToDelete];
        return { ...prev, [name]: changingObject };
      });
    }
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      handleAddField();
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputName = evt.target.name;
    const inputValue = evt.target.value;

    setField(prev => ({ ...prev, [inputName]: inputValue }));
  };

  const handleAddField = () => {
    const { key, pattern } = field;

    if (key) {
      setSettings(prev => ({
        ...prev,
        [name]: { ...prev[name], [key]: pattern },
      }));
    }
  };

  useEffect(() => {
    setField(initialField);
  }, [wholeValue]);

  return (
    <div className={styles.KeyAndValueField}>
      <LabelWithDescription name={name} description={description} />
      <div className={styles.keyAndValueFieldset}>
        <input
          type='text'
          name='key'
          id='key'
          className={styles.key}
          onChange={handleChange}
          value={field?.key || ''}
          placeholder='key'
        />
        <input
          type='text'
          name='pattern'
          id='pattern'
          className={styles.value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={field?.pattern || ''}
          placeholder='pattern'
        />
        <Button type='button' label='Add' handleClick={handleAddField} />
      </div>
      <div className={styles.existingPatterns}>
        {keys &&
          keys.length &&
          keys.map((key, idx) => (
            <ExistingValueItem
              key={key}
              idx={idx}
              handleDeleteItem={handleDeleteItem}
              item={`${key}: ${wholeValue[key]}`}
            />
          ))}
      </div>
    </div>
  );
};

export default KeyAndValueField;
