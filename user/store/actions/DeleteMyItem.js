import axios from 'axios';
import Api from '../../api/craftserver';
export const DELETE_MYITEM= 'DELETE_MYITEM';
export const DELETE_MYITEM_FAILED = 'DELETE_MYITEM_FAILED';



export const DeleteMyItem = (userid,itemid) => {

return async dispatch => {
    
    const response = await Api.delete(`/api/deletemyitem/${userid}/${itemid}`
    )
    .then(response => {
      dispatch({ type: DELETE_MYITEM, Iid: itemid})
  })
  .catch(err => {
      console.log(err);
      dispatch({ type: DELETE_MYITEM_FAILED, payload: err})
  }); 
}
};

