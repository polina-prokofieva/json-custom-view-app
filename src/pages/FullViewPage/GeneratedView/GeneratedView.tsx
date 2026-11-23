import { useRef, useEffect, FC } from 'react';
import { generate } from 'json-custom-view';
import styles from './GeneratedView.module.scss';
import { useJsonStore } from '../../../store/useJsonStore';

interface Props {
  json: string;
}

const GeneratedView: FC<Props> = ({ json }) => {
  const settings = useJsonStore((state) => state.settings);
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
