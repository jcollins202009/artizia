import React, {useEffect, useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useParams
// } from "react-router-dom";
import Navbar from './components/Navbar'
import craftserverApi from './api/craftserver'
import AnnouncementDisplay from './components/AnnouncementDisplay'
import Announcement from './components/Announcement'
import GeneralRules from './components/GeneralRules'
import ManageUsers from './components/ManageUsers'
import AnnouncementEdit from './components/AnnouncementEdit'
import AddCategory from './components/AddCategory';
import Notification from "./components/Notification/Notification";
import HomeScreen from './components/HomeScreen'

function App() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [expiredDate, setExpiredDate] = useState(new Date())
  const [annnouncementData, setAnnouncementData] = useState([])
  // const [category, setCategory] = useState();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState("signout");
  const [param, setParam] = useState("");
 

  useEffect (()=>{
  loadAnnouncement()
  }, [])

  const onSubmitmessage = async ({title, message, expiredDate})=>{
 
      try{
        const response = await craftserverApi.post('/announcement', {title, message, expiredDate})
        await console.log(response.data)
        await loadAnnouncement()
        // await setMessage('')
      } catch (err) {
        console.log(err)
      
    }
  }


const loadAnnouncement = async () =>{
try{
    const response = await craftserverApi.get('/announcement')
    
    setAnnouncementData(response.data)
} catch (err) {
    console.log(err)
}
}
const onUpdateMessage = async (idMessage, message) =>{
  
if(message.length<2){
  alert('Please Enter Message to edit')
} else{
await craftserverApi.post('/announcement/' + idMessage ,{ message})
  loadAnnouncement()
}

}


  const onDeleteMessage = async (idMessage) => {
    await craftserverApi.delete('/announcement/' + idMessage)
    loadAnnouncement()
  }

 const  onRouteChange =(route, param)=>{
    if(route === 'signout'){
      setIsSignedIn(false)
    }else if(route=== 'announcements'){
      setIsSignedIn(true)
    }
    setRoute(route)
    if(param){ setParam(Object.values(param)[0])}
   
  }
  let pageDisplay
  if(route==='createMessage'){
    pageDisplay = <Announcement  setIsSignedIn={setIsSignedIn} onRoute={onRouteChange}
              onChangeTitle={setTitle}
              onChangeExpiredDate={setExpiredDate}
              onChangeMessage={setMessage} 
              onSubmitmessage={()=>onSubmitmessage({title, message, expiredDate})}
              title={title} message={message} expiredDate={expiredDate}/>
  }

 if(route==='rules'){
  pageDisplay = <GeneralRules setIsSignedIn={setIsSignedIn} onRouteChange={onRouteChange} />
}
if(route==='addCategory'){
  pageDisplay = <AddCategory  setIsSignedIn={setIsSignedIn} onRoute={onRouteChange}/>
}

  if(route==='announcements'){
     pageDisplay = <AnnouncementDisplay annnouncementData={annnouncementData}
    onDeleteMessage={onDeleteMessage}
    onRouteChange={onRouteChange}
   />
  }
  if(route==='edit'){
     pageDisplay = <AnnouncementEdit idAnnouncements={param}
     onChangeExpiredDate={setExpiredDate}
     onChangeMessage={setMessage}
     onUpdateMessage={onUpdateMessage}
     title={title} message={message} expiredDate={expiredDate}
      setIsSignedIn={setIsSignedIn}
      onRouteChange={onRouteChange}
      />
  }
  if(route==='manageUsers'){
    pageDisplay = <ManageUsers  setIsSignedIn={setIsSignedIn} onRoute={onRouteChange}/>
  }
  
  if(route==='notification'){
    pageDisplay = <Notification  setIsSignedIn={setIsSignedIn} onRoute={onRouteChange}/>
 }
 if(route==='signout'){
  pageDisplay = <HomeScreen setIsSignedIn={setIsSignedIn} onRouteChange={onRouteChange} />
}
  return (

    <div className="App">
      <Navbar isSignedIn={isSignedIn} onRoute={onRouteChange} />
      {pageDisplay}
    {/* <Router>
      <div>
      
        <Switch>
        
        <Route path="/Notification" component={Notification} />
        <Route path="/manageusers" component={ManageUsers} />
          <Route path="/message">
            <Announcement onChangeTitle={setTitle}
              onChangeExpiredDate={setExpiredDate}
              onChangeMessage={setMessage} 
              onSubmitmessage={()=>onSubmitmessage({title, message, expiredDate})}
              title={title} message={message} expiredDate={expiredDate}
            />
          </Route>
          <Route path="/edit/:idAnnouncements">
          <AnnouncementEditPage onChangeTitle={setTitle}
      onChangeExpiredDate={setExpiredDate}
      onChangeMessage={setMessage}
      onUpdateMessage={onUpdateMessage}
      title={title} message={message} expiredDate={expiredDate}
       setIsSignedIn={setIsSignedIn}
       />
          </Route>
          <Route path="/rules">
            <GeneralRules />
          </Route>
          <Route path="/addCategory" component={AddCategory} /> */}
          {/* <Route path="/announcements">
          <AnnouncementDisplay annnouncementData={annnouncementData}
         onDeleteMessage={onDeleteMessage}
        />
          </Route> */}
          {/* <Route path="/"  >
            {isSignedIn ? null: <HomeScreen  setIsSignedIn={setIsSignedIn} /> }
            
          </Route>
        </Switch>
      </div>
    </Router> */}
    </div>
  );
// }
// const AnnouncementEditPage =({onChangeTitle, onChangeExpiredDate, onChangeMessage, onUpdateMessage, message, title, setIsSignedIn })=>{
 
// let {idAnnouncements} = useParams()
// // console.log(idAnnouncements)
// return <AnnouncementEdit idAnnouncements={idAnnouncements} 
// onChangeTitle={onChangeTitle} 
// onChangeExpiredDate={onChangeExpiredDate} 
// onChangeMessage={onChangeMessage}
// onUpdateMessage={onUpdateMessage}
// title={title} message={message}
// setIsSignedIn={setIsSignedIn} />

}

export default App;
