import React from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from '@material-ui/core';
import { IFormControl } from 'lib/types';

const SelectElement = ({
  value,
  name,
  onChange,
  error = null,
  label,
  required,
  options,
}: IFormControl) => {
  return (
    <FormControl
      variant="outlined"
      error={error ? true : false}
      required={required}
    >
      <InputLabel id={`select-field-${name}`}>{label}</InputLabel>
      <MuiSelect
        defaultValue={''}
        labelId={`select-field-${name}`}
        {...(!!error && { error: true })}
        name={name}
        value={value}
        label={label}
        inputProps={{
          id: name,
        }}
        onChange={onChange}
      >
        <MenuItem value="">None</MenuItem>
        {options &&
          options.map((option: any) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
      </MuiSelect>
      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default SelectElement;
