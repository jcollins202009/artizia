import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import craftserverApi from '../api/craftserver'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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



// const useStyles = makeStyles((theme) => ({
//     formControl: {
//       margin: theme.spacing(1),
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: theme.spacing(2),
//     },
//   }));

const ManageUsers = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')

  const setStatusHandler = async (email, status, date) => {
    if (!email || !status) {
      alert("Please eneter account and status to change")
    } else {
      try {
        setDate(new Date())
        let response = await craftserverApi.put('/profile/', { email, status, date })
        await alert(response.data)
      } catch (err) {
        alert(err)
      }

    }


  }
  return (
    <Grid className={classes.root} container alignItems="center" justify="center" direction="column" spacing={0}>
      <Grid item >
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.title} variant="h5">Manage Users</Typography>
            <div>
              <TextField size='small' className={classes.input} variant="outlined" label='Email' placeholder='email' value={email} onChange={(event) => setEmail(event.target.value)} />
            </div>

            <FormControl size='small' variant="outlined" className={classes.formControl}>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                autoWidth
                label="Status"
              >
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Disable'>Disable</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
          <CardActions className={classes.cardActions}>
            {/* <div className='div_button_cont'> */}
            <Button variant='contained' className={classes.button} onClick={() => setStatusHandler(email, status, date)}>
              Submit Changes
                   </Button>

            {/* </div> */}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};


export default ManageUsers;