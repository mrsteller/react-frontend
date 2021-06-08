import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  Box,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { AttachFile, CloudUpload, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "1em",
      paddingTop: 0,
    },
    close: {
      position: "absolute",
      top: 0,
      right: 0,
    },
    dropdown: { minWidth: 300 },
    noDropdown: { minWidth: "unset" },
  })
);

export const FileUpload = ({
  uploadType,
  fileTypeOptions = [],
  handleFile,
  onlyButton,
  uploadIcon,
  tooltip,
  edge,
}: {
  fileTypeOptions?: Array<string>;
  uploadType?: string;
  handleFile: (file: any, fileType: string) => void;
  onlyButton?: boolean;
  uploadIcon?: JSX.Element;
  tooltip?: string;
  edge?: false | "end" | "start";
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [fileType, setFileType] = React.useState(
    uploadType ?? fileTypeOptions[0]
  );

  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [isCustomFileType, setCustomFileType] = React.useState(false);
  const [customType, setCustomType] = React.useState("");

  const fileTypeRef = React.useRef(fileType);

  useEffect(() => {
    if (uploadType) setFileType(uploadType);
  }, [uploadType]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const reset = () => {
    if (fileTypeOptions) setFileType(fileTypeOptions[0]);
    setFileName("");
    setFile(null);
    setCustomFileType(false);
    setCustomType("");
    fileTypeRef.current = fileType;
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleUploadAndClose = () => {
    handleFile(file, fileTypeRef.current);
    handleClose();
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    hiddenFileInput?.current?.click();
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    //     setFile(event.target.files[0]);
    //     setFileName(event.target.files[0].name);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFileType(value);
    fileTypeRef.current = fileType;
    if (value === "Other") {
      setCustomFileType(true);
      fileTypeRef.current = customType;
    }
  };

  const handleCustomType = (e: any) => {
    setCustomType(e.target.value);
    fileTypeRef.current = customType;
  };

  return onlyButton ? (
    <>
      {uploadIcon ? (
        <Tooltip title={tooltip ?? ""}>
          <IconButton onClick={handleUpload} edge={edge}>
            {uploadIcon}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          component="button"
          startIcon={!uploadIcon && <AttachFile />}
          onClick={handleUpload}
          color="primary"
        >
          Attach {uploadType ?? "File"}
        </Button>
      )}
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={(e) => handleSelectFile(e)}
        style={{ display: "none" }}
        required
      />
    </>
  ) : (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        component="button"
        startIcon={<AttachFile />}
      >
        Attach {uploadType ?? "A File"}
      </Button>
      <Dialog
        open={open}
        onClose={handleUploadAndClose}
        aria-labelledby="upload-file"
        className={classes.root}
      >
        <DialogTitle id="upload-file">
          Upload {uploadType ?? "File"}
          <IconButton className={classes.close} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box py={2} className={classes.dropdown}>
            {fileTypeOptions && fileTypeOptions.length > 0 && (
              <TextField
                id="fileType"
                label="Select the File Type"
                variant="outlined"
                select
                fullWidth
                value={fileType}
                required
                onChange={handleSelect}
              >
                {fileTypeOptions &&
                  fileTypeOptions.concat("Other").map((option) => (
                    <MenuItem key={option} value={option}>
                      {`${option}`}
                    </MenuItem>
                  ))}
              </TextField>
            )}
            {isCustomFileType === true && (
              <Box py={2} style={{ width: "300px" }}>
                <TextField
                  variant="outlined"
                  label="Provide a file type"
                  value={customType}
                  onChange={handleCustomType}
                  fullWidth
                />
              </Box>
            )}
            <Box py={1} textAlign="center">
              <Button
                variant="contained"
                onClick={handleUpload}
                color="primary"
              >
                Select File
              </Button>
              <input
                type="file"
                ref={hiddenFileInput}
                onChange={(e) => handleSelectFile(e)}
                style={{ display: "none" }}
                required
              />
            </Box>
            {file !== null && (
              <DialogContentText>
                {fileName}
                {/* <IconButton onClick={deleteFile}>
                  <Delete />
                </IconButton> */}
              </DialogContentText>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            color="primary"
            onClick={handleClose}
            component="button"
            startIcon={<CloudUpload />}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
