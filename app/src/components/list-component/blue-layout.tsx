import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Box, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "2em",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "#003b71",
      minHeight: "100vh",
      // [theme.breakpoints.up('sm')]: { height: '100vh' },
    },
    content: {
      flexGrow: 1,
      [theme.breakpoints.up("sm")]: { padding: "1em" },
      // [theme.breakpoints.up('md')]: {
      //   marginTop: '4rem',
      // },
    },
    companyLogo: {
      color: "white",
    },
    topLogos: {
      margin: "auto",
      display: "flex",
      zIndex: 10,
      marginRight: "1em",
      marginLeft: "1em",
      [theme.breakpoints.down("sm")]: {
        paddingBottom: "1em",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 0,
        padding: "1em",
        fontSize: "smaller",
        flexGrow: 8,
      },
      [theme.breakpoints.up("sm")]: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: "2em",
        fontSize: "smaller",
        flexGrow: 8,
      },
    },
    logo: {
      margin: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      padding: "1.5em",
      paddingBottom: "4em",
    },
    topBar: {
      [theme.breakpoints.down("sm")]: { display: "flex" },
      [theme.breakpoints.up("sm")]: { display: "block" },
    },
    backButton: {
      [theme.breakpoints.up("sm")]: {
        position: "absolute",
        top: "2em",
        left: "2em",
      },
      color: "white",
      flexGrow: 1,
    },
    container: {
      backgroundColor: "white",
      margin: "auto",
      maxWidth: theme.breakpoints.values.md,
      padding: 0,
      paddingTop: "2em",
      boxShadow: "0px 10px 15px -10px grey inset",
      [theme.breakpoints.up("sm")]: {
        borderRadius: "10px",
        boxShadow: "none",
        paddingTop: 5,
        paddingBottom: 5,
      },
      marginBottom: "1em",
    },
  })
);

export function BlueLayout({
  children,
  caseName,
  locationName,
  back,
}: {
  children: JSX.Element;
  caseName?: string | React.ReactNode;
  locationName?: string | React.ReactNode;
  back?: boolean;
}): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Box className={classes.topBar}>
          <Box className={classes.topLogos}>
            <Typography variant="h6" className={classes.companyLogo}>
              {caseName}
            </Typography>
            <Typography variant="h4" className={classes.companyLogo}>
              {locationName}
            </Typography>
          </Box>
        </Box>

        <Container className={classes.container}>{children}</Container>
      </main>
    </div>
  );
}

export default BlueLayout;
