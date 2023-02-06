import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Button.module.scss';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  label: string;
  disabled?: boolean;
  handleClick?: (evt: any) => void;
}

interface LinkProps {
  label: string;
  to: string;
}

const Button: FC<Props> = ({ type, label, disabled, handleClick }) => {
  return (
    <button
      className={styles.Button}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

const ButtonNavLink: FC<LinkProps> = ({ label, to }) => {
  return (
    <NavLink to={`/${PROJECT_NAME}${to}`} className={styles.Button}>
      {label}
    </NavLink>
  );
};

export { ButtonNavLink };

export default Button;
