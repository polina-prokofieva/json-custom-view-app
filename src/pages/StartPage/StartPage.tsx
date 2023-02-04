import { FC } from 'react';
import ChooseDataSource from '../../components/ChooseDataSource/ChooseDataSource';
import styles from './StartPage.module.scss';

const StartPage: FC = () => {
  return (
    <div className={styles.StartPage}>
      <h2 className={styles.header}>
        This is a live demo of{' '}
        <a
          href='https://www.npmjs.com/package/json-custom-view'
          target='_blank'
        >
          json-custom-view
        </a>{' '}
        library.
      </h2>
      <ChooseDataSource />
      <p className={styles.links}>
        <a
          href='https://www.npmjs.com/package/json-custom-view'
          target='_blank'
        >
          Read documentation
        </a>
        <a
          href='https://github.com/polina-prokofieva/json-custom-view'
          target='_blank'
        >
          Git Repository
        </a>
      </p>
    </div>
  );
};

export default StartPage;
