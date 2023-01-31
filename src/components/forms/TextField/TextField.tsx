import { FC } from 'react';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './TextField.module.scss';

interface Props {
  value: string;
  description?: string;
}

const TextField: FC<Props> = ({ value, description }) => {
  return (
    <div key={value} className={styles.TextField}>
      <div>
        <LabelWithDescription name={value} description={description} />:
      </div>
      <input type='text' name={value} id={value} />
    </div>
  );
};

export default TextField;
