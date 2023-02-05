import { FC, FormEvent } from 'react';
import Button, { ButtonNavLink } from '../../components/Button/Button';
import styles from './PutJsonLayout.module.scss';

interface Props {
  name: string;
  title?: string;
  readyToRender: boolean;
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => void;
  children: JSX.Element;
}

const PutJsonLayout: FC<Props> = ({
  name,
  title,
  readyToRender,
  handleSubmit,
  children,
}) => {
  return (
    <div className={styles.PutJsonLayout}>
      <form onSubmit={handleSubmit} className={styles.putJsonForm}>
        {title && <label htmlFor={name}>{title}:</label>}
        {children}
        <div className={styles.buttons}>
          <ButtonNavLink to='/start' label='Back' />
          <Button label='Render' type='submit' disabled={!readyToRender} />
        </div>
      </form>
    </div>
  );
};

export default PutJsonLayout;
