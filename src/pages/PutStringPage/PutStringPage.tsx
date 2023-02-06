import {
  FC,
  FormEvent,
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import { useNavigate } from 'react-router-dom';
import PutJsonLayout from '../../layouts/PutJsonLayout/PutJsonLayout';
import styles from './PutStringPage.module.scss';

interface Props {
  setData: Dispatch<SetStateAction<string | null>>;
}

const PutStringPage: FC<Props> = ({ setData }) => {
  const [jsonValue, setJsonValue] = useState<string>('');
  const navigate = useNavigate();
  const formName = 'jsonString';

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setData(jsonValue);
    navigate(`/${PROJECT_NAME}/full-view`);
  };

  const textareaChangedHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    setJsonValue(evt.target.value);
  };

  return (
    <PutJsonLayout
      name={formName}
      title='Insert Json here'
      readyToRender={!!jsonValue.length}
      handleSubmit={handleSubmit}
    >
      <textarea
        name={formName}
        id={formName}
        className={styles.textarea}
        cols={100}
        rows={5}
        onChange={textareaChangedHandler}
        value={jsonValue}
      />
    </PutJsonLayout>
  );
};

export default PutStringPage;
