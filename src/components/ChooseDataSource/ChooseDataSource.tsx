import { Link } from 'react-router-dom';
import { ButtonNavLink } from '../Button/Button';
import styles from './ChooseDataSource.module.scss';

const ChooseDataSource = () => {
  return (
    <div className={styles.ChooseDataSource}>
      <ButtonNavLink to='/upload-json-file' label='Upload JSON file' />
      <ButtonNavLink to='/put-json-string' label='Put JSON as a string' />
    </div>
  );
};

export default ChooseDataSource;
