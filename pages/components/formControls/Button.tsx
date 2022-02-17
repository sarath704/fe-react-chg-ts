import React from 'react';
import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: 'none',
  },
}));

const Button = ({ size, color, variant, onClick, text, ...other }: any) => {
  const classes = useStyles();

  return (
    <MuiButton
      size={size || 'large'}
      variant={variant || 'contained'}
      onClick={onClick}
      color={color || 'primary'}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};
export default Button;
