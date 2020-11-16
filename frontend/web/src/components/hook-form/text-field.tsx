import * as React from 'react';
import { SmartFormInput } from './form';
import { useFormContext } from 'react-hook-form';

export const TextField: React.FC<SmartFormInput> = ({ name }) => {
  const { register } = useFormContext();
  // const error = React.useMemo(() => (errors?.hasOwnProperty(name) ? errors[name] : undefined), [
  //   name,
  //   errors,
  // ]);
  return <input type="text" ref={register} name={name} />;
};
