import { FC } from 'react';

const SettingField: FC<any> = ({
  Component,
  ...otherProps
}: {
  Component: FC<any>;
}) => {
  return <Component {...otherProps} />;
};

export default SettingField;
