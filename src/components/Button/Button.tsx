import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Button.module.scss';
import classnames from 'classnames';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  label: string;
  disabled?: boolean;
  handleClick?: (evt: any) => void;
  additionalClass?: string;
}

interface LinkProps {
  label: string;
  to: string;
}

const Button: FC<Props> = ({
  type,
  label,
  disabled,
  handleClick,
  additionalClass,
}) => {
  const classNames = classnames(styles.Button, {
    [additionalClass || 0]: !!additionalClass,
  });
  return (
    <button
      className={classNames}
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

const SmallButton: FC<Props> = props => (
  <Button {...props} additionalClass={styles.small} />
);

export { ButtonNavLink, SmallButton };

export default Button;
