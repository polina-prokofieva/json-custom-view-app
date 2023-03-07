import {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { SettingsType } from 'json-custom-view';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './DoubleTextField.module.scss';

interface Props {
  name: string;
  initialValues: [string, string];
  labels: [string, string];
  description?: string;
  setSettings: Dispatch<SetStateAction<SettingsType>>;
}

const DoubleTextField: FC<Props> = ({
  name,
  initialValues = ['false', 'true'],
  labels,
  description,
  setSettings,
}) => {
  const [values, setValues] = useState<[string, string]>(initialValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, idx: number) => {
    setValues(prev => {
      const result: [string, string] = [...prev];
      result[idx] = evt.target.value;
      return result;
    });
  };

  useEffect(() => {
    setSettings((prev: SettingsType) => ({ ...prev, [name]: values }));
  }, [values]);

  return (
    <div className={styles.DoubleTextField}>
      <LabelWithDescription name={name} description={description} />
      <div className={styles.fields}>
        {labels.map((label, idx) => (
          <div className={styles.field} key={label}>
            <label htmlFor={`${name}[${idx}]`}>{label}:</label>
            <input
              type='text'
              value={values[idx] || ''}
              name={`${name}[${idx}]`}
              onChange={evt => {
                handleChange(evt, idx);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoubleTextField;
