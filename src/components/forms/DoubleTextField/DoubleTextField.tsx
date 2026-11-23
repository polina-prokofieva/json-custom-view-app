import {
  FC,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import LabelWithDescription from '../LabelWithDescription/LabelWithDescription';
import styles from './DoubleTextField.module.scss';
import { useJsonStore } from '../../../store/useJsonStore';

interface Props {
  name: string;
  initialValues: [string, string];
  labels: [string, string];
  description?: string;
}

const DoubleTextField: FC<Props> = ({
  name,
  initialValues = ['false', 'true'],
  labels,
  description,
}) => {
  const updateSettings = useJsonStore((state) => state.updateSettings);
  const [values, setValues] = useState<[string, string]>(initialValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, idx: number) => {
    setValues(prev => {
      const result: [string, string] = [...prev];
      result[idx] = evt.target.value;
      return result;
    });
  };

  useEffect(() => {
    updateSettings({ [name]: values });
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
