import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './output.css'
import Header from './Components/Header'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import BlogList from './Components/BlogList'

function App() {
  const [darkmode , setdarkmode] = useState(true);
  const [loggedIn , setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [currentUserUUID, setcurrentUserUUID] = useState(null);
  const [profilePic, setProfilepic] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const checkIfAdmin = (uuid) =>{
    // if there is a current user then check
    // if no current user dont check 
    // if current user matches admin uuid then return set is admin to true
    if(!currentUserUUID) return;
    if(uuid == currentUserUUID){
      setIsAdmin(true);
    }
  }

  useEffect(()=>{
    // everytime the username changes then call check if admin
    checkIfAdmin(currentUserUUID);
  },[username])

  return (
  <Router>
    <div className={`${darkmode ? "bg-slate-700 text-cyan-600 min-h-screen" : "bg-lightmode text-cyan-600 min-h-screen"}`}>
      <Header darkmode={darkmode} setdarkmode={setdarkmode} setLoggedIn={setLoggedIn} loggedIn={loggedIn} username={username} setUsername={setUsername} profilePic={profilePic} setProfilepic={setProfilepic}></Header>
        <Routes>
          {loggedIn && <Route path='/' element={<BlogList/>}></Route>}
          
        </Routes>
    </div>
    </Router>
  )
}

export default App
