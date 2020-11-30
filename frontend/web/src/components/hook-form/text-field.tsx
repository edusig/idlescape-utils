import * as React from 'react';
import { SmartFormInput } from './form';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { darken, lighten } from 'polished';

const Input = styled.input`
  padding: 0.5rem 1rem;
  border: thin solid ${props => props.theme.palette.primary.main};
  border-radius: 0.25rem;
  &:active,
  &:focus {
    border-color: ${props => darken(0.1, props.theme.palette.primary.main)};
  }
  &:hover {
    background-color: ${props => lighten(0.65, props.theme.palette.primary.main)};
  }
  transition: background 300ms;
  outline: none;
`;

interface TextFieldProps extends SmartFormInput {
  className?: any;
}

export const TextField: React.FC<TextFieldProps> = ({ name, className }) => {
  const { register } = useFormContext();
  // const error = React.useMemo(() => (errors?.hasOwnProperty(name) ? errors[name] : undefined), [
  //   name,
  //   errors,
  // ]);
  return <Input type="text" ref={register} name={name} className={className} />;
};
