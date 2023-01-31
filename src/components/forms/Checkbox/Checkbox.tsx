import { FC } from 'react';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './Checkbox.module.scss';

interface Props {
  value: string;
  checked: boolean;
  description?: string;
}

const Checkbox: FC<Props> = ({ value, checked, description }) => {
  return (
    <div key={value} className={styles.Checkbox}>
      <input type='checkbox' name={value} id={value} checked={checked} />
      <LabelWithDescription name={value} description={description} />
    </div>
  );
};

export default Checkbox;
