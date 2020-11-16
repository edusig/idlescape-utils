import * as React from 'react';
import { SmartFormInput } from './form';
import { useFormContext } from 'react-hook-form';

export interface SelectOption {
  /** The value that will be used by the form submission */
  value?: any;
  /** The text that will be shown in the select option */
  label: string;
  /** A flag for grouping options within a subtitled group */
  group?: boolean;
  /** Used when group flag is true, its the sub options to be rendered inside the group  */
  options?: Pick<SelectOption, 'label' | 'value'>[];
}

export interface SelectFieldProps {
  name?: string;
  /** A list of options that can be selected */
  options: SelectOption[];
  label?: string;
}

export const SelectField: React.FC<SelectFieldProps & SmartFormInput> = ({
  // Smart Field
  name,
  // Select Field
  options,
  // MUI Select
  label,
  ...selectProps
}) => {
  const { register } = useFormContext();
  // const error = React.useMemo(() => (errors?.hasOwnProperty(name) ? errors[name] : undefined), [
  //   name,
  //   errors,
  // ]);

  const select = <Select {...selectProps} name={name} inputRef={register} options={options} />;

  return label != null ? (
    <>
      <label>{label}</label>
      {select}
    </>
  ) : (
    select
  );
};

export interface SelectOption {
  /** The value that will be used by the form submission */
  value?: any;
  /** The text that will be shown in the select option */
  label: string;
  /** A flag for grouping options within a subtitled group */
  group?: boolean;
  /** Used when group flag is true, its the sub options to be rendered inside the group  */
  options?: Pick<SelectOption, 'label' | 'value'>[];
}

export interface SelectFieldProps {
  /** A list of options that can be selected */
  options: SelectOption[];
  inputRef?: any;
}

const mapNative = (op: SelectOption, idx: number) =>
  op.group ? (
    <optgroup label={op.label} key={idx}>
      {op.options?.map(it => (
        <option key={`${idx}-${it.label}`} value={it.value}>
          {it.label}
        </option>
      ))}
    </optgroup>
  ) : (
    <option key={idx} value={op.value}>
      {op.label}
    </option>
  );

export const Select: React.FunctionComponent<SelectFieldProps> = ({
  // Select Field
  options,
  inputRef,
  ...selectProps
}) => {
  const { register } = useFormContext();
  return (
    <select {...selectProps} ref={register}>
      {options.map(mapNative)}
    </select>
  );
};
