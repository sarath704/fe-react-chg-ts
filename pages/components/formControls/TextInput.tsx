import React from 'react';
import { TextField } from '@material-ui/core';
import { IFormControl } from 'lib/types';

const TextInput = ({
  value,
  label,
  error = null,
  onChange,
  name,
  required,
  ...other
}: IFormControl) => {
  return (
    <TextField
      {...(!!error && { error: true, helperText: error })}
      variant="outlined"
      value={value}
      label={label}
      onChange={onChange}
      name={name}
      inputProps={{
        id: name,
      }}
      required={required}
      {...other}
    />
  );
};
export default TextInput;
