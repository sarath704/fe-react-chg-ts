import { makeStyles } from '@material-ui/core';
import { InitValuesTypes } from 'lib/types';
import React, { useState } from 'react';

export default function useForm(
  initialValues: InitValuesTypes,
  validationOnChange = false,
  validate: any,
) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<any>({});

  const handleInputChange = (e: any) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });

    if (validationOnChange) {
      validate({ [name]: value });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setError({});
  };

  return {
    values,
    setValues,
    handleInputChange,
    resetForm,
    error,
    setError,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%',
      marginBottom: theme.spacing(2),
      boxSizing: 'border-box',
    },
  },
}));

export function Form(props: any) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      role="form"
      {...other}
    >
      {children}
    </form>
  );
}
