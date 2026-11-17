import { FC } from 'react';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './TextField.module.scss';

interface Props {
  value: string;
  current?: string;
  description?: string;
}

const TextField: FC<Props> = ({ value, current = '', description }) => {
  return (
    <div className={styles.TextField}>
      <div>
        <LabelWithDescription name={value} description={description} />
      </div>
      <input type='text' name={value} id={value} defaultValue={current} />
    </div>
  );
};

export default TextField;
