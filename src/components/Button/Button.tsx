import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Button.module.scss';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  label: string;
}

interface LinkProps {
  label: string;
  to: string;
}

const Button: FC<Props> = ({ type, label }) => {
  return (
    <button className={styles.Button} type={type}>
      {label}
    </button>
  );
};

const ButtonNavLink: FC<LinkProps> = ({ label, to }) => {
  return (
    <NavLink to={to} className={styles.Button}>
      {label}
    </NavLink>
  );
};

export { ButtonNavLink };

export default Button;
