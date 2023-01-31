import {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { SettingsType } from '../../../types';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './ListField.module.scss';

interface Props {
  name: string;
  value: string[];
  description?: string;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const ListField: FC<Props> = ({
  name,
  value = [],
  description,
  setSettings,
}) => {
  const [list, setList] = useState(value);
  const [current, setCurrent] = useState<string>('');

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCurrent(evt.target.value);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      if (list.indexOf(current) === -1) {
        setList(prev => [...prev, current]);
      }
      setCurrent('');
    }
  };

  const handleDeleteItem = (idx: number) => {
    setList(prev => {
      const updated = [...prev];
      updated.splice(idx, 1);
      return updated;
    });
  };

  useEffect(() => {
    setSettings(prev => ({ ...prev, [name]: list }));
  }, [list]);

  return (
    <div className={styles.ListField}>
      <div>
        <LabelWithDescription name={name} description={description} />:
      </div>
      <div className={styles.fieldAndList}>
        <input
          type='text'
          name={name}
          id={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={current}
        />
        <ul className={styles.listOfValues}>
          {list.map((item, idx) => (
            <li key={item}>
              {item}
              <button type='button' onClick={() => handleDeleteItem(idx)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListField;
