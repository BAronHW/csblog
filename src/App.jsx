import { useState } from 'react'
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
  const [profilePic, setProfilepic] = useState("");

  return (
  <Router>
    <div className={`${darkmode ? "bg-slate-700 text-cyan-600 min-h-screen" : "bg-lightmode text-cyan-600 min-h-screen"}`}>
      <Header darkmode={darkmode} setdarkmode={setdarkmode} setLoggedIn={setLoggedIn} loggedIn={loggedIn} username={username} setUsername={setUsername} profilePic={profilePic} setProfilepic={setProfilepic}></Header>
        <Routes>
          {loggedIn && <Route path='/' element={<BlogList/>}></Route>}
          {/* <Route path='/login' element={<Login/>}></Route> */}
        </Routes>
    </div>
    </Router>
  )
}

export default App
