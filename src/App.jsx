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

  return (
  <Router>
    <div className={`${darkmode ? "bg-slate-700 text-cyan-600 min-h-screen" : "bg-lightmode text-cyan-600 min-h-screen"}`}>
      <Header darkmode={darkmode} setdarkmode={setdarkmode}></Header>
        <Routes>
          <Route path='/' element={<BlogList/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </div>
    </Router>
  )
}

export default App
