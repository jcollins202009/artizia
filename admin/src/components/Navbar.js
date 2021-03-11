import { Link, Button, Container } from '@material-ui/core'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import logo from '../logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: "100%",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.main
  },
  title: {
    color: theme.palette.title.main,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40
  },
  heading: {
    color: theme.palette.heading.main,
    marginBottom: 20,
  },
  body: {
    color: theme.palette.body.main,
    // marginBottom: 20        
  },
  card: {
    backgroundColor: theme.palette.cardBackground.main,
    marginBottom: '30%',
    boxShadow: '5px 10px ' + theme.palette.boxShadow.main
    // #888888'

    // transition: "0.3s",
    // boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    // "&:hover": {
    //   boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    // }        
  },
  cardContent: {
    paddingLeft: 80,
    paddingRight: 80,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 80,
    paddingBottom: 40
  },
  messageCard: {
    backgroundColor: theme.palette.cardBackground.main,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 40,
    marginLeft: '20%',
    marginRight: '20%',
    paddingBottom: 10,
    paddingTop: 20,
    boxShadow: '5px 10px ' + theme.palette.boxShadow.main
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.buttonText.main,
    textTransform: 'none',
    fontSize: 16,
    '&:hover': {
      backgroundColor: 'black'
    }    
  },
  button2: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.buttonText.main,
    textTransform: 'none',
    fontSize: 16,
  },
  navButton: {
    backgroundColor: theme.palette.navButtonBackground.main,
    color: theme.palette.navButtonText.main,
    // textTransform: 'none',
    fontSize: 16,
    marginRight: 30
  },
  input: {
    marginBottom: 15,
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.inputContainer.main
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.inputContainerHover.main
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.inputContainerFocused.main
    },
    backgroundColor: 'white',
    minWidth: 300
  },
  // inputLabel: {
  //     color: theme.palette.inputLabel.main,
  //     '&.Mui-focused': {
  //         color: theme.palette.inputLabel.main
  //       }        
  // }
  formControl: {
    marginBottom: 15,
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.inputContainer.main
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.inputContainerHover.main
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.inputContainerFocused.main
    },
    backgroundColor: 'white',
    minWidth: 120,
  },
  navBar: {
    minWidth: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.navBackground.main,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 'auto',
    marginLeft: 30,
    marginTop: -8
  }
}))


// const useStles= makeStyles({
//     navbar: {
//         paddingRight:20,

//     }
// })

const Navbar = ({ isSignedIn, onRoute }) => {
  const classes = useStyles()
  const signout = () => {
    localStorage.removeItem('token')
    onRoute('signout')
  }

  return (
    <Container className={classes.navBar}>
      <img src={logo} className={classes.logo} />

      { isSignedIn ? <>
        <Link onClick={() => onRoute('announcements')} underline='none'  ><Button variant='contained' className={classes.navButton}>announcements</Button></Link>
        <Link onClick={() => onRoute('createMessage')} underline='none' ><Button variant='contained' className={classes.navButton}>Create Announcement</Button></Link>
        <Link onClick={() => onRoute('rules')} underline='none' ><Button variant='contained' className={classes.navButton}>Rules</Button></Link>
        <Link onClick={() => onRoute('addCategory')} underline='none' ><Button variant='contained' className={classes.navButton}>Add Category</Button></Link>
        <Link onClick={() => onRoute('notification')} underline='none' ><Button variant='contained' className={classes.navButton}>Send Notification</Button></Link>
        <Link onClick={() => onRoute('manageUsers')} underline='none' ><Button variant='contained' className={classes.navButton}>Manage Users</Button></Link>
        <Link onClick={() => signout()} style={{ marginLeft: 'auto' }} underline='none' ><Button variant='contained' className={classes.navButton}>Signout</Button></Link>
      </> : <></>
      }
    </Container>
  );


};

export default Navbar;

