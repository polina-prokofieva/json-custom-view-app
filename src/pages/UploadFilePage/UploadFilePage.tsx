import { FC, FormEvent, ChangeEvent, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import PutJsonLayout from '../../layouts/PutJsonLayout/PutJsonLayout';
import { useJsonStore } from '../../store/useJsonStore';
import styles from './UploadFilePage.module.scss';

const UploadFilePage: FC = () => {
  const saveMainJson = useJsonStore((state) => state.saveMainJson);
  const [jsonValue, setJsonValue] = useState<string>('');
  const fileInput = useRef<HTMLInputElement>(null);

  const formName = 'jsonFile';
  const navigate = useNavigate();
  let reader: FileReader;

  const saveAndOpen = async (value: string) => {
    const isSaved = await saveMainJson(value);
    if (isSaved) {
      navigate(`/${PROJECT_NAME}/full-view`);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    void saveAndOpen(jsonValue);
  };

  const handleFileRead = () => {
    const fileContent = reader.result;

    if (typeof fileContent === 'string' && fileContent.length) {
      setJsonValue(fileContent);
      void saveAndOpen(fileContent);
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    if (file) {
      reader = new FileReader();
      reader.onloadend = handleFileRead;
      reader.readAsText(file);
    }
  };

  const handleCaptureClick = () => {
    fileInput?.current?.click();
  };

  return (
    <PutJsonLayout
      name={formName}
      readyToRender={!!jsonValue.length}
      handleSubmit={handleSubmit}
    >
      <div className={styles.UploadFile}>
        <div className={styles.uploadText} onClick={handleCaptureClick}>
          Drag and drop .json file here or{' '}
          <Button type='button' label='select it from computer' />
        </div>
        <input
          type='file'
          id={formName}
          name={formName}
          accept='.json'
          onChange={handleChange}
          ref={fileInput}
        />
      </div>
    </PutJsonLayout>
  );
};

export default UploadFilePage;
