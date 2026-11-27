import {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import ExistingValueItem from '../ExistingValueItem/ExistingValueItem';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './ListField.module.scss';
import { useJsonStore } from '../../../store/useJsonStore';

interface Props {
  name: string;
  value: string[];
  description?: string;
  placeholder?: string;
}

const ListField: FC<Props> = ({
  name,
  value = [],
  description,
  placeholder,
}) => {
  const updateSettings = useJsonStore((state) => state.updateSettings);

  const [list, setList] = useState(value);
  const [current, setCurrent] = useState('');

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCurrent(evt.target.value);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      if (list.indexOf(current) === -1) {
        const updated = [...list, current];
        setList(updated);
        updateSettings({ [name]: updated });
      }
      setCurrent('');
    }
  };

  const handleDeleteItem = (idx: number) => {
    const updated = [...list];
    updated.splice(idx, 1);
    setList(updated);
    updateSettings({ [name]: updated });
  };

  return (
    <div className={styles.ListField}>
      <div>
        <LabelWithDescription name={name} description={description} />
      </div>
      <div className={styles.fieldAndList}>
        <input
          type='text'
          name={name}
          id={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={current}
          placeholder={placeholder}
        />
        <ul className={styles.listOfValues}>
          {list.map((item, idx) => (
            <ExistingValueItem
              key={`${item} ${typeof item}`}
              item={item}
              idx={idx}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListField;
