import Api from '../../api/craftserver';
import * as Notifications from 'expo-notifications';
import *as Permissions from 'expo-permissions';
export const CREATE_REVIEWITEM = 'CREATE_REVIEWITEM';
export const CREATE_REVIEWITEM_PENDING = 'CREATE_REVIEWITEM_PENDING';
export const CREATE_REVIEWITEM_SUCCESS = 'CREATE_REVIEWITEM_SUCCESS';
export const CREATE_REVIEWITEM_FAILED = 'CREATE_REVIEWITEM_FAILED';


export const createReviewItem = (shortDescription,itemReview,itemRating) => {
  
  return async dispatch => {
    let token;
    
    Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then((statusObj) => {
      console.log(">>>>" + statusObj.status)
      if (statusObj.status !== 'granted') {
        
        return Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
      return statusObj;
    })
    .then((statusObj) => {
     
      if (statusObj.status !== 'granted') {
       
        throw new Error('Permission not granted!');
      }
    })
    .then(() => {
      console.log("getting token>>>")

      return Notifications.getExpoPushTokenAsync();
    })
    .then(response => {
      token = response.data;
    
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
   
    console.log('Before fetch');
    
    const response = await  Api.post('/api/newitemreview',
      { 
        shortDescription,
        itemReview,
        itemRating
      }).then(resData => {if (!response.ok) {
        throw new Error('Error create review seller');
      }
       })
    .then(response)
    .then(resData => {
     dispatch({ type:  CREATE_REVIEWITEM_SUCCESS, payload: response});
    })
     .catch(err => {
      dispatch({ type: CREATE_REVIEWITEM_FAILED, payload: response });
     });
     console.log("token>>>"+ token)
     Notifications.scheduleNotificationAsync({
      content:{
        to:token,
        title:'Review',
        body:'Your review was sended!',
        
      },
      
      trigger:{
        seconds:1
      }
    })



  };
};

