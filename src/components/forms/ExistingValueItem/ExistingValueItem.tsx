import { FC } from 'react';
import styles from './ExistingValueItem.module.scss';

interface Props {
  item: string;
  idx: number;
  handleDeleteItem: (idx: number) => void;
}

const ExistingValueItem: FC<Props> = ({ item, idx, handleDeleteItem }) => {
  return (
    <li className={styles.ExistingValueItem}>
      <span className={styles.item}>{item}</span>
      <button type='button' onClick={() => handleDeleteItem(idx)}>
        ×
      </button>
    </li>
  );
};

export default ExistingValueItem;
