import React from 'react';
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
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
  


// const useStyles = makeStyles({
//     container: {
//         background: 'lightBlue',    
//         borderRadius: 10  ,
//         margin: 10,
//         paddingBottom: 10,
//         paddingTop: 10
//     },

//     title: {
//         display: 'flex',
//         marginBottom:10,
//         marginTop: 20,

//     },
//     date: {
//         display: 'flex',
//         marginTop: 15,
//         marginBottom: 5
//     },
//     dateInside: {
//         paddingLeft: 50
//     }
// })

const AnnouncementDisplay = ({ annnouncementData, onDeleteMessage, onRouteChange }) => {
    const classes = useStyles()

    const annoucementDisplay = annnouncementData.map((data) => {
        return (

            <Card className={classes.messageCard} key={data.idAnnouncements}>
                <CardContent className={classes.cardContent}>

                    {/* <Container className={classes.container }  key={data.idAnnouncements}> */}
                    <Typography className={classes.heading} variant="h6">{data.title}</Typography>
                    {/* <div className={classes.title} > */}
                    {/* <div style={{fontWeight:'bold', fontSize: 20, marginRight: 'auto'}}>  {data.title} </div> */}
                    {/* </div> */}
                    <Typography className={classes.body} style={{marginBottom: 50}} variant="body1">{data.message}</Typography>
                    {/* <div>{data.message}</div> */}
                    {/* <div className= {classes.date}> */}
                    {/* <label>Date Entered</label> */}
                    <Typography className={classes.body} variant="body2">Date posted: {data.dateEntered.substring(0, 10)}</Typography>
                    {/* <div className={classes.dateInside}>{data.dateEntered.substring(0,10)}</div>  */}
                    {/* </div> */}
                    {/* <div className= {classes.date}> */}
                    {/* <label>Expiry Date</label> */}
                    <Typography className={classes.body} gutterBottom={true} variant="body2">Expiry date: {data.expiredDate.substring(0, 10)}</Typography>

                    {/* <div className={classes.dateInside}>   {data.expiredDate.substring(0,10)}</div> */}
                    {/* </div>             */}

                </CardContent>
                <CardActions className={classes.cardActions}>
                    {/* <Typography className={classes.body} variant="body2">Date posted: {data.dateEntered.substring(0, 10)}</Typography>
                    <Typography className={classes.body} gutterBottom={true} variant="body2">Expiry date: {data.expiredDate.substring(0, 10)}</Typography> */}

                    <Button variant='contained' className={classes.button} style={{marginRight: 40}} onClick={() => onRouteChange(`edit`, { param: data.idAnnouncements })}>Edit</Button>
                    <Button variant='contained' className={classes.button2} onClick={() => onDeleteMessage(data.idAnnouncements)}>Delete</Button>
                </CardActions>
            </Card>
            // </Container>
        )
    })


    return (
        // <Container maxWidth='lg'>
        <Grid className={classes.root} container alignItems="center" justify="center" direction="column" spacing={0}>
            <Grid item >
                {/* <h1>Announcements</h1> */}
                <Typography className={classes.title} variant="h5">Announcements</Typography>
                {annoucementDisplay}
                {/* </Container> */}
            </Grid>
        </Grid>
    );
};

export default AnnouncementDisplay;