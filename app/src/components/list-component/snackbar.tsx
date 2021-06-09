import React, { useEffect, useState } from 'react';
import { Button, Snackbar as SnackbarMUI, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

type SnackbarProps = {
  message: string;
  removeMessage: () => void;
  action?: { name: string; handler: () => void };
  noClose?: boolean;
};

export const Snackbar = (props: SnackbarProps) => {
  const { message, action, noClose, removeMessage } = props;
  const [open, setOpen] = useState(message !== null);

  useEffect(() => {
    setOpen(message !== null);
  }, [message]);

  useEffect(() => {
    return () => removeMessage();
  }, []);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {/* <Button onClick={()=> setOpen(true))}>Open simple snackbar</Button> */}
      <SnackbarMUI
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            {action && (
              <Button color="secondary" size="small" onClick={action.handler}>
                {action.name}
              </Button>
            )}
            {!noClose && (
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </React.Fragment>
        }
      />
    </>
  );
};

export default Snackbar;
