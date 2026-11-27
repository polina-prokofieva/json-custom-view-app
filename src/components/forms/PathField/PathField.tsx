import {
  ChangeEvent,
  KeyboardEvent,
  FC,
  useMemo,
  useState,
} from 'react';
import { SmallButton } from '../../Button/Button';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './PathField.module.scss';
import { useJsonStore } from '../../../store/useJsonStore';

interface Props {
  name: string;
  value: string[];
}

const PathField: FC<Props> = ({ name, value = [] }) => {
  const updateSettings = useJsonStore((state) => state.updateSettings);

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
    updateSettings({ [name]: [] });
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCurrent(evt.target.value);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter' && current.length) {
      const updated = [...path, current];
      setPath(updated);
      updateSettings({ [name]: updated });
      setCurrent('');
    }
  };

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
