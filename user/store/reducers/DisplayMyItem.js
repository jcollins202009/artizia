import Items from '../../models/item';
import { SET_ITEM } from '../actions/DisplayMyItem';
import { DELETE_MYITEM} from '../actions/DeleteMyItem';
const initialState = {
  items: []
};

export const userItemsReducer =(state = initialState, action) => {
 //console.log(action.type)
  switch (action.type) {
    case SET_ITEM:
      console.log(action.payload) 
      return Object.assign({}, state, {items: action.myitem });
      case DELETE_MYITEM:
      console.log("delete item reducer>>>" + action.type)
      console.log("delete item reducer>>>" + action.Iid)
      return {
        
        items: state.items.filter( item => item.id !== action.Iid)
      
      }
  
  }

  return state;
};
