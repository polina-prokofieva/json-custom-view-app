import { FC } from 'react';
import styles from './ExistingValueItem.module.scss';
import classNames from 'classnames';

interface Props {
  item: string;
  idx: number;
  handleDeleteItem: (idx: number) => void;
}

const ExistingValueItem: FC<Props> = ({ item, idx, handleDeleteItem }) => {
  let type: 'string' | 'number' | 'boolean' | 'null' = 'string';
  let value: string;

  if (item === null) {
    type = 'null';
    value = 'null';
  } else {
    value = item.toString();

    if (typeof item === 'number') {
      type = 'number';
    } else if (typeof item === 'boolean') {
      type = 'boolean';
    }
  }

  return (
    <li className={classNames(styles.ExistingValueItem, [styles[type]])}>
      <span className={styles.item}>{value}</span>
      <button type='button' onClick={() => handleDeleteItem(idx)}>
        ×
      </button>
    </li>
  );
};

export default ExistingValueItem;
