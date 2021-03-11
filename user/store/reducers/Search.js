import { UPDATE_SEARCH_TERM,
  SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_PENDING,
  SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_SUCCESS,
  SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_FAILED,
  SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_CRITERIA_SUCCESS,
  SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_CRITERIA_FAILED } from '../constants';


const initialStateSearchTerm = {
  searchTerm: '',
};

export const searchTermReducer = (state = initialStateSearchTerm, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_TERM:
      return { ...state, searchTerm: action.searchTerm };
   default:
      return state;
  }
};

const initialStateSearchMostRecentItemsByCategoryMatchingSearchTerm = {
  isPending: false,
  mostRecentItemsByCategoryMatchingSearchTerm: [],
  error: ''
};

export const searchMostRecentItemsByCategoryMatchingSearchTermReducer = (state = initialStateSearchMostRecentItemsByCategoryMatchingSearchTerm, action={}) => {
 
  switch (action.type) {
    
    case SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_PENDING:
      return Object.assign({}, state, { isPending: true});
    case SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_SUCCESS:
      return Object.assign({}, state, {mostRecentItemsByCategoryMatchingSearchTerm: action.payload, isPending: false });
    case SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_FAILED:
      return Object.assign({}, state, {error: action.payload, isPending: false});
    default:
      return state;
  }
};

const initialStateSearchMostRecentItemsByCategoryMatchingSearchCriteria = {
  mostRecentItemsByCategoryMatchingSearchCriteria: [],
  error: ''
};

export const searchMostRecentItemsByCategoryMatchingSearchCriteriaReducer = (state = initialStateSearchMostRecentItemsByCategoryMatchingSearchCriteria, action={}) => {
 
  switch (action.type) {  
    case SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_CRITERIA_SUCCESS:
      return Object.assign({}, state, {mostRecentItemsByCategoryMatchingSearchCriteria: action.payload});
    case SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_CRITERIA_FAILED:
      return Object.assign({}, state, {error: action.payload});
    default:
      return state;
  }
};
