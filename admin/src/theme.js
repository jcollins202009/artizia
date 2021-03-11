import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0c6980',
    },
    secondary: {
      main: '#00a8a8',
    },
    error: {
      main: red.A400,
    },
    background: {
      main: '#e8f4f8',
    },
    navBackground: {
        main: '#0c6980',
    },    
    cardBackground: {
        main: '#c4dbe0'
    },
    title: {
        main: 'black'
    },
    heading: {
        main: 'black'
    },
    body: {
        main: 'black'
    },    
    buttonText: {
        main: 'white'
    },
    navButtonBackground: {
        main: '#00a8a8'
    },
    navButtonText: {
        main: 'white'
    },    
    inputContainer: {
        main: '#858585'
    },
    inputContainerHover: {
        main: '#858585'
    },
    inputContainerFocused: {
        main: '#858585'
    },
    boxShadow: {
        main: '#888888'
    }
  },
  overrides: {
    MuiInputLabel: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: "#858585",
        "&$focused": { // increase the specificity for the pseudo class
          color: "black"
        }
      }
    }
  },
//   typography: {
//     fontFamily: [
//       'Open Sans',
//     ].join(','),
//  }  
 });