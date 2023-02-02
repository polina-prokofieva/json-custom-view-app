import {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonNavLink } from '../../components/Button/Button';
import styles from './PutStringPage.module.scss';

interface Props {
  setData: Dispatch<SetStateAction<string | null>>;
}

const PutStringPage: FC<Props> = ({ setData }) => {
  const [jsonValue, setJsonValue] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setData(jsonValue);
    navigate('/full-view');
  };

  const textareaChangedHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    setJsonValue(evt.target.value);
  };

  return (
    <div className={styles.PutStringPage}>
      <h3>Insert Json here:</h3>
      <form onSubmit={handleSubmit} className={styles.putJsonForm}>
        <textarea
          name='jsonString'
          id='jsonString'
          className={styles.textarea}
          cols={100}
          rows={5}
          onChange={textareaChangedHandler}
          value={jsonValue}
        />
        <div className={styles.buttons}>
          <ButtonNavLink to='/start' label='Back' />
          <Button label='Render' type='submit' disabled={!jsonValue.length} />
        </div>
      </form>
    </div>
  );
};

export default PutStringPage;
