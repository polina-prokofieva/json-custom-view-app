import {
  FC,
  FormEvent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useState,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import PutJsonLayout from '../../layouts/PutJsonLayout/PutJsonLayout';

interface Props {
  setData: Dispatch<SetStateAction<string | null>>;
}

const UploadFilePage: FC<Props> = ({ setData }) => {
  const [jsonValue, setJsonValue] = useState<string>('');

  const formName = 'jsonFile';
  const navigate = useNavigate();
  let reader: FileReader;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setData(jsonValue);
    navigate('/full-view');
  };

  const handleFileRead = (evt: ProgressEvent<FileReader>) => {
    const fileContent = reader.result;

    if (typeof fileContent === 'string') {
      setJsonValue(fileContent);
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

  useEffect(() => {
    if (jsonValue.length) {
      setData(jsonValue);
      navigate('/full-view');
    }
  }, [jsonValue]);

  return (
    <PutJsonLayout
      name={formName}
      title='Choose file from your computer'
      readyToRender={!!jsonValue.length}
      handleSubmit={handleSubmit}
    >
      <input
        type='file'
        id={formName}
        name={formName}
        accept='.json'
        onChange={handleChange}
      />
    </PutJsonLayout>
  );
};

export default UploadFilePage;
