import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  FC,
  SetStateAction,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { SettingsType } from '../../../types';
import { SmallButton } from '../../Button/Button';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './PathField.module.scss';

interface Props {
  name: string;
  value: string[];
  description?: string;
  placeholder?: string;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const PathField: FC<Props> = ({ name, value = [], setSettings }) => {
  const [path, setPath] = useState(value);
  const [current, setCurrent] = useState('');

  const lastDot = useMemo(() => !!current.length, [current]);
  const isResetAvailable = useMemo(() => !!(path.length || current.length), [
    path,
    current,
  ]);

  const handleReset = () => {
    setCurrent('');
    setPath([]);
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCurrent(evt.target.value);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && current.length) {
      setPath(prev => [...prev, current]);
      setCurrent('');
    }
  };

  useEffect(() => {
    setSettings(prev => ({ ...prev, [name]: path }));
  }, [path]);

  return (
    <div className={styles.PathField}>
      <div className={styles.labelAndResetButton}>
        <LabelWithDescription name={name} />
        {isResetAvailable && (
          <SmallButton
            type='button'
            label='Reset root'
            handleClick={handleReset}
          />
        )}
      </div>
      <div className={styles.valueAndField}>
        {path && path.length ? (
          <PathValue path={path} lastDot={lastDot} />
        ) : null}
        <input
          type='text'
          name={name}
          id={name}
          value={current}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

interface PathValueProps {
  path: string[];
  lastDot: boolean;
}

const PathValue: FC<PathValueProps> = ({ path, lastDot }) => {
  return (
    <div className={styles.PathValue}>
      {path.map((item, idx) => (
        <span key={item}>
          {item}
          {idx < path.length - 1 ? '.' : ''}
        </span>
      ))}
      {lastDot ? '.' : ''}
    </div>
  );
};

export default PathField;
