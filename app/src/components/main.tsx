import React, { useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@material-ui/core";
import { BlueLayout } from "./list-component/blue-layout";
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from "./theme";
import "@fontsource/lato";
import "@fontsource/montserrat";
import { FormFileList, ConfirmationAlert } from "./list-component";

type MainProps = { id?: string };

export const Main = (props: MainProps) => {
  const { id } = props;
  const list = { forms, files, requiredFiles, fileTypeOptions };

  const [openLockedForm, setOpenLockedForm] = useState(null);

  const openForm = (form: any) => {
    form.locked ? setOpenLockedForm(form.id) : console.log(form);
  };

  const unlock = () => {
    const formIndex = list.forms.findIndex((f) => f.id === openLockedForm);
    setOpenLockedForm(null);
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
            {openLockedForm !== null && (
              <ConfirmationAlert
                confirmationText="You will need to resign this form after opening it."
                handleSubmit={unlock}
                handleCancel={() => setOpenLockedForm(null)}
                title={"Unlock Form"}
                buttonText={{
                  primary: "Accept",
                  secondary: "Cancel",
                }}
              />
            )}
            <FormFileList
              {...{
                list: list,
                download: (e) => console.log(e),
                print: (e) => console.log(e),
                handleClickItem: (e) => console.log(e),
                handleFileUpload: (e) => console.log(e),
                handleDeleteFile: (e) => console.log(e),
              }}
            />
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
