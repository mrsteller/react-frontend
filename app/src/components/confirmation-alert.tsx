import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { padding: theme.spacing(2) },
    buttonContainer: { padding: theme.spacing(2) },
    button: { marginRight: "0.5em" },
  })
);

export const ConfirmationAlert: React.FC<{
  handleSubmit: () => void;
  handleCancel: () => void;
  confirmationText: string;
  title?: string;
  buttonText?: { primary: string; secondary: string };
}> = ({
  handleSubmit,
  handleCancel,
  confirmationText,
  title,
  buttonText = { primary: "Yes", secondary: "No" },
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Dialog
      open
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleCancel}
      fullWidth
    >
      {title && (
        <DialogTitle>
          <Typography variant="h5" component="span">
            {title}
          </Typography>
        </DialogTitle>
      )}
      <DialogContent>
        <DialogContentText color="textPrimary">
          <Typography variant={title ? "body2" : "h6"} component="span">
            {confirmationText}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.buttonContainer}>
        <Button
          onClick={handleCancel}
          color="primary"
          className={classes.button}
        >
          {buttonText.secondary}
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          autoFocus
        >
          {buttonText.primary}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationAlert;
