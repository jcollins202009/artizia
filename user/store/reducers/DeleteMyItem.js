import Item from '../../models/item';
import { DELETE_MYITEM, DELETE_MYITEM_FAILED } from '../actions/DeleteMyItem';

const initialState = {
  items: []
};
export const deletemyItemReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case DELETE_MYITEM:
      console.log("delete item reducer>>>" + action.type)
      console.log("delete item reducer>>>" + action.Iid)
      return {
        
        items: state.items.filter( item => item.id !== action.Iid)
      
      }
     
     }
    
  return state;
};
