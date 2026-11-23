import { FC, FormEvent, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import PutJsonLayout from '../../layouts/PutJsonLayout/PutJsonLayout';
import { useJsonStore } from '../../store/useJsonStore';
import styles from './PutStringPage.module.scss';

const PutStringPage: FC = () => {
  const saveMainJson = useJsonStore((state) => state.saveMainJson);
  const [jsonValue, setJsonValue] = useState<string>('');
  const navigate = useNavigate();
  const formName = 'jsonString';

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const isSaved = await saveMainJson(jsonValue);
    if (isSaved) {
      navigate(`/${PROJECT_NAME}/full-view`);
    }
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
