import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiChekcbox,
} from '@material-ui/core';
import { IFormControl } from 'lib/types';

const CheckBox = ({
  value,
  name,
  onChange,
  label,
  error,
  required,
}: IFormControl) => {
  const convertToDefaultEventPara = (name: any, value: any) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <FormControl error={!!error} required={required}>
      <FormControlLabel
        control={
          <MuiChekcbox
            name={name}
            required={required}
            checked={value as any}
            onChange={(e) =>
              onChange(convertToDefaultEventPara(name, e.target.checked))
            }
            color="primary"
          />
        }
        label={label}
      />
      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CheckBox;
