import createDataContext from './createDataContext'
import {navigate} from '../RootNavigation'
import craftserverApi from '../api/craftserver'


const announcementsReducer = (state, action)=>{
    switch(action.type){

        case 'fetch_announcements':
            return action.payload

        default:
            return state
    }
}
const fetchAnnouncements = dispatch => async()=>{
    const response = await craftserverApi.get('/announcement')
    dispatch({type: 'fetch_announcements', payload: response.data})
  
}

export const {Provider, Context } = createDataContext(
    announcementsReducer,
    { fetchAnnouncements },
    []
)