import { FC } from 'react';
import styles from './LabelWithDescription.module.scss';

interface Props {
  name: string;
  description?: string;
}

const LabelWithDescription: FC<Props> = ({ name, description }) => {
  return (
    <label htmlFor={name} className={styles.LabelWithDescription}>
      <span className={styles.name}>
        {name}&nbsp;
        {description && (
          <span className={styles.description}>({description})</span>
        )}
      </span>
    </label>
  );
};

export default LabelWithDescription;
