import { FC } from 'react';
import GeneratedView from './GeneratedView/GeneratedView';
import Settings from './Settings/Settings';
import { useJsonStore } from '../../store/useJsonStore';
import styles from './FullViewPage.module.scss';

const FullViewPage: FC = () => {
  const mainJson = useJsonStore((state) => state.mainJson);

  if (!mainJson) return null;

  return (
    <div className={styles.FullViewPage}>
      <div className={styles.rendered}>
        <GeneratedView json={mainJson} />
      </div>
      <div className={styles.settings}>
        <Settings data={mainJson} />
      </div>
    </div>
  );
};

export default FullViewPage;
