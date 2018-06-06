// Setup base Material-UI theme
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const headlineFont = `Merriweather, Georgia, serif`;
const bodyFont = `"Open Sans", Roboto, "Helvetica Neue", Arial, sans-serif`;
console.log(grey);

export default createMuiTheme({
  palette: {
    primary: {
      light: "#9be7ff",
      main: "#64b5f6",
      dark: "#2286c3",
      contrastText: "#000"
    },
    secondary: {
      light: "#ff94c2",
      main: "#f06292",
      dark: "#ba2d65",
      contrastText: "#000"
    },
    error: red,
    action: {
      hoverOpacity: 0.25,
      main: grey
    },
  },
  typography: {
    fontFamily: bodyFont,
    // fontSize: 14, // default
    color: grey[900],
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    display1: {
      fontFamily: headlineFont,
      color: grey[900],
    },
    display2: { fontFamily: headlineFont, color: grey[900] },
    display3: { fontFamily: headlineFont, color: grey[900] },
    display4: { fontFamily: headlineFont, color: grey[900] },
    headline: { fontFamily: headlineFont, color: grey[900] },
    subheading: { fontFamily: headlineFont, color: grey[900] },
    title: { fontFamily: headlineFont, color: grey[900], fontWeight: 400 },
    body1: {
      fontFamily: bodyFont,
      color: grey[900],
      fontWeight: 400,
      margin: '1em 0',
      '& h2': { fontFamily: headlineFont, color: grey[900], fontWeight: 400 },
      '& h3': { fontFamily: headlineFont, color: grey[900], fontWeight: 400 },
    },
    '& p': { color: grey[900] },
  },
  overrides: {
    MuiGrid: {
      'spacing-xs-16': {
        margin: '0 -8px',
        '& > *[class^=MuiGrid-typeItem]': {
          padding: '0 8px',
        },
      },
    },
  },
});
