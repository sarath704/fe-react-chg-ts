import React, { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/close';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { DecisionTypes } from 'lib/types';

const AUTO_HIDE_DURATION = 3000;

interface ToasterProps {
  decision: DecisionTypes;
  handleTosterClose: () => void;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ToasterComponent = ({ decision, handleTosterClose }: ToasterProps) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, [decision]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    handleTosterClose();
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={AUTO_HIDE_DURATION}
      onClose={handleClose}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert
        onClose={handleClose}
        severity={decision === 'accepted' ? 'success' : 'error'}
      >
        {decision}
      </Alert>
    </Snackbar>
  );
};
export default ToasterComponent;
