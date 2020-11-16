import * as React from 'react';
import { Control, SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';

export interface FormProps {
  onSubmit: SubmitHandler<any>;
  onError?: SubmitErrorHandler<any>;
}

export interface SmartFormInput {
  name: string;
  register?: ((instance: any | null) => void) | React.RefObject<any> | null | undefined;
  control?: Control<Record<string, any>>;
  error?: any;
}

export const Form: React.FC<FormProps> = ({ children, onSubmit, onError }) => {
  const { handleSubmit } = useFormContext();
  const childrenMap = React.Children.map(children, child =>
    React.isValidElement(child) && child?.props?.name
      ? React.createElement(child?.type, {
          ...{
            ...child?.props,
            key: child?.props.name,
          },
        })
      : child
  );

  return <form onSubmit={handleSubmit(onSubmit, onError)}>{childrenMap}</form>;
};
