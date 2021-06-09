import React, { useEffect, useState } from "react";
import {
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Button,
  Dialog,
  Fab,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Theme as theme } from ".././theme";
import { Close, Add } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      // marginTop: -36
    },
    closeDialog: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    fab: {
      position: "sticky",
      float: "right",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    dialog: {
      minWidth: 350,
      // position: 'relative',
      // padding: '2em',
    },
  })
);

export const DialogHoc = ({
  open,
  name,
  submit,
  cancel,
  content,
  error,
  title,
  fabIcon,
  noFab,
  buttons,

  color,
}: {
  open: boolean;
  submit: (form: any) => void;
  cancel?: () => void;
  content?: JSX.Element;
  error?: boolean;
  name?: string;
  title?: string;
  fabIcon?: JSX.Element;
  noFab?: boolean;
  buttons?: { primary: string; secondary?: string };
  color?: "secondary" | "default" | "primary" | "inherit";
}) => {
  const classes = useStyles();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(open ?? false);

  const close = () => {
    setOpenDialog(false);
    if (cancel) cancel();
  };

  useEffect(() => {
    if (open !== null) setOpenDialog(open);
  }, [open]);

  const onSubmit = (form: any) => {
    form.persist();
    submit(form);
    !error && close();
  };

  return (
    <>
      {!noFab && (
        <Fab
          color={color ?? "primary"}
          className={classes.fab}
          onClick={() => setOpenDialog(true)}
        >
          {fabIcon ?? <Add />}
        </Fab>
      )}
      <Dialog
        open={openDialog}
        onClose={close}
        className={classes.dialog}
        fullScreen={mobile}
        PaperProps={{ className: classes.dialog }}
      >
        <DialogTitle>{title ?? `Add ${name}`}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={close}
          className={classes.closeDialog}
        >
          <Close />
        </IconButton>
        <DialogContent className={classes.content}>
          <>
            {content}
            <DialogActions>
              <Button
                onClick={() => {
                  cancel && cancel();
                  close();
                }}
                color="primary"
              >
                {buttons?.secondary ?? "Cancel"}
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={onSubmit}
              >
                {buttons?.primary ?? "Add"}
              </Button>
            </DialogActions>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogHoc;
