import React, { useState, useEffect } from "react";
import {
  Container,
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Box,
  Tooltip,
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  CloudDownload,
  Print,
  Attachment,
  Delete,
  Description,
  Lock,
  Edit,
  Visibility,
} from "@material-ui/icons";
import { FileUpload } from "./file-upload";

export type FileType = {
  id: string;
  filename: string;
  uploadDate: Date | string;
  path: string;
  fileType: string;
  description?: string;
};
export type Form = {
  id: string;
  name: string;
  title: string;
  completed?: boolean;
  locked: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    flexWrapper: { display: "flex" },
    list: { flexGrow: 6, marginTop: "1em" },

    actionButtons: {
      paddingLeft: "1em",
    },
    primaryText: {
      paddingRight: "0.5em",
    },
    secondaryText: {
      paddingRight: "1em",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    completedAvatar: { backgroundColor: theme.palette.secondary.dark },
    avatar: {},
    fileWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    upload: {
      display: "flex",
      flexDirection: "row-reverse",
      padding: "0 2em",
    },
    uploadFile: {
      display: "flex",
      flexDirection: "row",
      padding: "0 2em",
      margin: "1em 1.5em",
    },
  })
);

export type FormFileListProps = {
  list: {
    forms: Form[];
    files: FileType[];
    fileTypeOptions?: Array<string>;
    requiredFiles: Array<string>;
  };
  download: (id: string) => void;
  print: (id: string) => void;
  handleClickItem: (item: any) => void;
  handleFileUpload: (file: any) => void;
  handleDeleteFile: (file: any) => void;
  client?: boolean;
};

export const FormFileList = ({
  list,
  download,
  print,
  handleClickItem,
  handleFileUpload,
  handleDeleteFile,
  client,
}: FormFileListProps) => {
  const classes = useStyles();

  const uploadedRequiredFiles =
    "requiredFiles" in list
      ? list.files
          .filter((file) => list.requiredFiles.includes(file.fileType))
          .map((f) => f.fileType)
      : [];

  const getLabel = (label: string): string => {
    const labelWidth = 20;
    if (label.length <= labelWidth) return label;
    else {
      return `${label.substring(0, labelWidth)}...`;
    }
  };

  return (
    <Box>
      <List className={classes.list}>
        {[...list.forms, ...list.files].map((f) => (
          <ListItem
            key={f.id}
            button
            onClick={() => {
              !client && handleClickItem(f);
            }}
          >
            <ListItemAvatar>
              <Avatar
                className={
                  ("completed" in f && f.completed) || "fileType" in f
                    ? classes.completedAvatar
                    : classes.avatar
                }
              >
                {"fileType" in f ? <Attachment /> : <Description />}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography
                  component="p"
                  className={classes.primaryText}
                  color="textPrimary"
                >
                  {"title" in f
                    ? getLabel(f.title)
                    : "fileType" in f && getLabel(f.fileType)}
                </Typography>
              }
              secondary={
                <Typography
                  component="p"
                  className={classes.secondaryText}
                  color="textSecondary"
                >
                  {"description" in f ? f.description : ""}
                </Typography>
              }
            />

            <ListItemSecondaryAction>
              {"locked" in f && f.locked ? (
                <Tooltip title="This form is locked.">
                  <IconButton edge="end">
                    <Lock />
                  </IconButton>
                </Tooltip>
              ) : client ? (
                <Tooltip
                  title={"fileType" in f ? "Edit file type" : "View form"}
                >
                  <IconButton edge="end" onClick={() => handleClickItem(f)}>
                    {"fileType" in f ? <Edit /> : <Visibility />}
                  </IconButton>
                </Tooltip>
              ) : (
                "fileType" in f || (
                  <Tooltip title="Fill in form">
                    <IconButton edge="end" onClick={() => handleClickItem(f)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                )
              )}
              {"completed" in f && f.completed && (
                <>
                  <Tooltip title="Dowload completed form">
                    <IconButton
                      edge="end"
                      aria-label="download"
                      onClick={() => download(f.id)}
                    >
                      <CloudDownload />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Print completed form">
                    <IconButton
                      edge="end"
                      aria-label="print"
                      onClick={() => print(f.id)}
                    >
                      <Print />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              {"fileType" in f && f.fileType && (
                <>
                  {/* <FileUpload
                    {...{
                      handleFile: handleFileUpload,
                      uploadType: f.fileType,
                      onlyButton: true,
                      uploadIcon: <CloudUpload />,
                      tooltip: `Upload new ${f.fileType}.`,
                      edge: 'end',
                    }}
                  /> */}
                  <Tooltip title="Delete uploaded file">
                    <IconButton
                      onClick={() => handleDeleteFile(f)}
                      edge="end"
                      aria-label="delete file"
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Box>
        <Box>
          {"requiredFiles" in list &&
            list.requiredFiles
              .filter((r) => !uploadedRequiredFiles.includes(r))
              .map((file) => (
                <Box className={classes.uploadFile} key={file}>
                  <FileUpload
                    {...{
                      handleFile: handleFileUpload,
                      uploadType: file,
                    }}
                  />
                </Box>
              ))}
          <Box className={classes.upload}>
            <FileUpload
              {...{
                handleFile: handleFileUpload,
                fileTypeOptions: list.fileTypeOptions,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FormFileList;
