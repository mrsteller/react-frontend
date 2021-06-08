import { createMuiTheme } from "@material-ui/core/styles";

export const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#006aa9", //'#0098D8', // '#0089C2'
      light: "#60c9ff", // '#79D0F4', //"#5DC2ED"
      dark: "#003b71", //'#006aa9', //#0089C2', //'#003B71',
      contrastText: "#F0FAFB",
    },
    secondary: {
      main: "#2EC1C9", // '#81E1E7'
      light: "#70f4fc", //'#D5F4F5'
      dark: "#009098", // '#2EC1C9'
      contrastText: "#003b71", // '#F0FAFB',
    },
    error: {
      main: "#E02727",
      light: "#FE3C3C",
      dark: "#c72222",
    },
    warning: {
      main: "#FF6D10", // '#B65500',
      light: "#F69546", // '#f69546',
      dark: "#B65500",
    },
    background: {
      default: "#fff",
      //  paper: '#fff',
      // default: '#f8feff',
    },
    grey: {
      100: "#E5E5E5",
      200: "#F0F3F7",
      400: "#AEB6C9",
      600: "#6F798E",
      800: "#4E5873",
      900: "#111E36",
    },
    text: {
      primary: "#111E36",
      secondary: "#6F798E",
    },
  },
  typography: {
    fontFamily: ["Lato"].join(","),
    // fontWeightRegular: 500,
    // fontWeightLight: 400,
    h1: {
      fontFamily: ["Montserrat"].join(","),
      fontWeight: "bolder",
      color: "#003b71",
      fontSize: "3rem",
      //letterSpacing: '0 em',
    },
    h2: {
      fontFamily: ["Montserrat"].join(","),
      fontWeight: "bolder",
      color: "#003b71",
      fontSize: "2.5rem",
      //letterSpacing: '0.004 em',
    },
    h3: {
      fontFamily: ["Montserrat"].join(","),
      fontWeight: "bolder",
      color: "#003b71",
      fontSize: "2rem",
      //letterSpacing: '0.008em',
    },
    h4: {
      fontFamily: ["Montserrat"].join(","),
      fontWeight: "bolder",
      color: "#003b71",
      fontSize: "1.5rem",
      letterSpacing: "0.01em",
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      letterSpacing: "0.05em",
      // lineHeight: 1.75,
      // textTransform: 'uppercase',
    },
  },

  // overrides: {
  //   MuiButton: {
  //     containedSecondary: {
  //       color: '#fff',
  //       backgroundColor: '#70f4fc',
  //       '&:hover': { backgroundColor: '#009098' },
  //     },
  //     textSecondary: {
  //       color: '#1e848a',
  //       '&:hover': { backgroundColor: '#F0F3F7' },
  //     },
  //   },
  // },
});

export default Theme;
