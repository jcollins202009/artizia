import { UPDATE_SEARCH_TERM,
    SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_PENDING,
    SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_SUCCESS,
    SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_FAILED,
    SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_CRITERIA_SUCCESS,
    SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_CRITERIA_FAILED } from '../constants';
import Api from '../../api/craftserver';

export const updateSearchTerm = (term) => {
    return { type: UPDATE_SEARCH_TERM, searchTerm: term };
};

export const searchForMostRecentItemsByCategoryMatchingSearchTerm = (dispatch, searchTerm) => {
    dispatch({ type: SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_PENDING });

    Api.get(`/api/mostRecentItemsByCategoryMatchingSearchTerm/${searchTerm}/3`)
    .then(response => {
        dispatch({ type: SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_SUCCESS, payload: response.data})
    })
    .catch(err => {
        console.log(err);
        dispatch({ type: SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_TERM_FAILED, payload: err})
    }); 
};

export const searchForMostRecentItemsByCategoryMatchingSearchCriteria = (searchTerm, categoryId, numberOfMostRecentItems) => {
    return async dispatch => {

        const response = await Api.get(`/api/mostRecentItemsByCategoryMatchingSearchCriteria/${searchTerm}/${categoryId}/${numberOfMostRecentItems}`)
        .then(response => {
            dispatch({ type: SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_CRITERIA_SUCCESS, payload: response.data})
        })
        .catch(err => {
            console.log(err);
            dispatch({ type: SEARCH_MOST_RECENT_ITEMS_BY_CATEGORY_MATCHING_SEARCH_CRITERIA_FAILED, payload: err})
        }); 
    };
  };
  