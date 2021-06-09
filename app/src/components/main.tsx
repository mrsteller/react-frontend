import React, { useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@material-ui/core";
import { BlueLayout } from "./list-component/blue-layout";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from "./theme";
import "@fontsource/lato";
import "@fontsource/montserrat";
import { FormFileList, ConfirmationAlert, Snackbar } from "./list-component";

type MainProps = { id?: string };

export const Main = (props: MainProps) => {
  const { id } = props;
  const list = { forms, files, requiredFiles, fileTypeOptions };

  const [confirm, setConfirm] = useState<{
    msg: string | null;
    handler: any;
  }>({
    msg: null,
    handler: null,
  });
  const [snack, setSnack] = useState<string | null>(null);

  const fireSnack = (msg: string) => setSnack(msg);

  const openForm = (form: any) => {
    if (form.locked) {
      setConfirm({ msg: "Unlock this form?", handler: unlock });
    } else {
      setConfirm({ msg: null, handler: null });
      fireSnack("Opened.");
    }
  };

  const unlock = () => {
    setConfirm({ msg: null, handler: null });
    setSnack("Unlocked.");
  };

  const deleteFile = (e: any) => {
    setConfirm({ msg: null, handler: null });
    setSnack("Deleted.");
  };

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline>
        <BlueLayout>
          <Container>
            <Box py={3} textAlign="center">
              <Typography variant="h2">Forms and Files List</Typography>
              <Typography variant="body1" color="textSecondary">
                This is where all your forms and files are kept.
              </Typography>
            </Box>
            {confirm.msg !== null && (
              <ConfirmationAlert
                confirmationText={confirm.msg}
                handleSubmit={confirm.handler}
                handleCancel={() => setConfirm({ msg: null, handler: null })}
                title={"Unlock Form"}
              />
            )}
            <FormFileList
              {...{
                list: list,
                download: (e) => console.log(e),
                print: (e) => console.log(e),
                handleClickItem: (e) => openForm(e),
                handleFileUpload: (e) => console.log("upload file", e),
                handleDeleteFile: (e) =>
                  setConfirm({ msg: "Delete this file?", handler: deleteFile }),
              }}
            />
            {snack !== null && (
              <Snackbar message={snack} removeMessage={() => setSnack(null)} />
            )}
          </Container>
        </BlueLayout>
      </CssBaseline>
    </ThemeProvider>
  );
};

export default Main;

const requiredFiles = ["Drivers License"];
const files = [
  {
    filename: "driversLicense.jpg",
    fileType: "Drivers License",
    path: "/jbloggs/driversLicense.jpg",
    uploadDate: "2021-05-01",
    id: "555",
  },
];
const fileTypeOptions = [
  "Application Form",
  "Resume",
  "Drivers License",
  "WOTC",
];
const forms = [
  {
    name: "inquiryForm",
    title: "Basic Information",
    id: "123",
    completed: false,
    locked: false,
  },
  {
    name: "wotc",
    title: "WOTC",
    id: "222",
    completed: true,
    locked: true,
  },
  {
    name: "appication",
    title: "Application Form",
    id: "321",
    completed: false,
    locked: true,
  },
];
