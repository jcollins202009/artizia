export const SET_ITEM = 'SET_ITEM';
export const SET_ITEM_FAILED = 'SET_ITEM_FAILED';
import Api from '../../api/craftserver';

export const fetchitem = (dispatch) => {
  dispatch({ type: SET_ITEM });
  
  Api.get(`/api/myitem/`)
    .then(res => {
         dispatch({ type: SET_ITEM,  myitem: res.data})
  })
  .catch(err => {
      console.log(err);
      dispatch({ type: SET_ITEM_FAILED, payload: err})
  }); 
};