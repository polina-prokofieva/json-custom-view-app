import {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useMemo,
} from 'react';
import { keysForArraysType } from 'json-custom-view';
import Button from '../../Button/Button';
import ExistingValueItem from '../ExistingValueItem/ExistingValueItem';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './KeyAndValueField.module.scss';
import { useJsonStore } from '../../../store/useJsonStore';

interface Props {
  name: string;
  wholeValue: keysForArraysType;
  description?: string;
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
}) => {
  const settings = useJsonStore((state) => state.settings);
  const updateSettings = useJsonStore((state) => state.updateSettings);

  const [field, setField] = useState<FieldType>(initialField);

  const keys = useMemo(
    () =>
      wholeValue && typeof wholeValue === 'object' && Object.keys(wholeValue),
    [wholeValue]
  );

  const handleDeleteItem = (idx: number) => {
    const keyToDelete = !!keys && keys[idx];

    if (keyToDelete) {
      const changingObject = { ...settings[name] };
      delete changingObject[keyToDelete];
      updateSettings({ [name]: changingObject });
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
      updateSettings({
        [name]: { ...settings[name], [key]: pattern },
      });
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
      {keys && !!keys.length && (
        <div className={styles.existingPatterns}>
          {keys.map((key, idx) => (
            <ExistingValueItem
              key={key}
              idx={idx}
              handleDeleteItem={handleDeleteItem}
              item={`${key}: ${wholeValue[key]}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default KeyAndValueField;
