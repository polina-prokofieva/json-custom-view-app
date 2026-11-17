import { FC } from 'react';
import { ButtonNavLink } from '../Button/Button';
import styles from './ChooseDataSource.module.scss';

type Props = {
  isSavedDataExists: boolean;
}

const ChooseDataSource: FC<Props> = ({ isSavedDataExists }) => {
  return (
    <div className={styles.ChooseDataSource}>
      {isSavedDataExists && <ButtonNavLink to='/full-view' label='Restore previous JSON' />}
      <ButtonNavLink to='/upload-json-file' label='Upload JSON file' />
      <ButtonNavLink to='/put-json-string' label='Put JSON as a string' />
    </div>
  );
};

export default ChooseDataSource;
