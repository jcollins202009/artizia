import {DELETE_MYITEM } from '../actions/DeleteMyItem';
  import ItemReview from '../../models/itemreview';
  
  const initialState = {
    itemreviews: []
  };
  
  export const reviewItemReducer = (state = initialState, action) => {
    
      switch (action.type) {
        
        case CREATE_REVIEWITEM_PENDING:
          return Object.assign({}, state, { isPending: true});
        case CREATE_REVIEWITEM_SUCCESS:
          const newItemReview = new ItemReview(
            action.payload.shortDescription,
            action.payload.itemReview,
            action.payload.itemRating,
            action.payload.ownerPushToken
            
          );      
    
          return Object.assign({}, state, {itemreviews: state.itemreviews.concat(newItemReview), isPending: false });
        case CREATE_REVIEWITEM_FAILED:
          return Object.assign({}, state, {error: action.payload, isPending: false});
        default:
          return state;      
      }
    
    
    };
    