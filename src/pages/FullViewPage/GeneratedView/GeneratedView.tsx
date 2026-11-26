import { useRef, FC } from 'react';
import styles from './GeneratedView.module.scss';
import useGenerateJson from './hooks/useGenerateJson';

interface Props {
  json: string;
}

const GeneratedView: FC<Props> = ({ json }) => {
  const mainRef = useRef<HTMLDivElement>(null);

  useGenerateJson({ json, mainRef });

  return <div ref={mainRef} className={styles.GeneratedView}></div>;
};

export default GeneratedView;
