import { Dispatch, FC, SetStateAction, MouseEvent } from 'react';
import { SettingsTabType } from '../../../../types';
import classNames from 'classnames';
import styles from './SettingsHeader.module.scss';

interface Props {
  activeTab: SettingsTabType;
  setActiveTab: Dispatch<SetStateAction<SettingsTabType>>;
}

const SettingsHeader: FC<Props> = ({ activeTab, setActiveTab }) => {
  const tabs: SettingsTabType[] = ['form', 'object'];

  return (
    <div className={styles.SettingsHeader}>
      <h4 className={styles.header}>Settings</h4>
      <ul className={styles.tabs}>
        {tabs.map(tabName => (
          <Tab
            key={tabName}
            name={tabName}
            isActive={activeTab === tabName}
            setActiveTab={setActiveTab}
          />
        ))}
      </ul>
    </div>
  );
};

interface TabProps {
  name: SettingsTabType;
  isActive: boolean;
  setActiveTab: Dispatch<SetStateAction<SettingsTabType>>;
}

const Tab: FC<TabProps> = ({ name, isActive, setActiveTab }) => {
  const handleClick = (evt: MouseEvent) => {
    setActiveTab(name);
  };

  return (
    <li
      className={classNames(styles.Tab, { [styles.active]: isActive })}
      onClick={handleClick}
    >
      {name}
    </li>
  );
};

export default SettingsHeader;
