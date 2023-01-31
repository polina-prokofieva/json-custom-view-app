import { useRef, useEffect, FC } from 'react';
import { generate } from 'json-custom-view';
import styles from './GeneratedView.module.scss';

interface Props {
  json: string;
  settings: object;
}

const GeneratedView: FC<Props> = ({ json, settings }) => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      const mainNode: HTMLDivElement = mainRef.current;
      if (mainNode !== null) {
        mainNode.innerHTML = '';
        mainRef.current && generate(json, mainNode, settings);
      }
    }
  }, [mainRef, settings]);

  return <div ref={mainRef} className={styles.GeneratedView}></div>;
};

export default GeneratedView;
