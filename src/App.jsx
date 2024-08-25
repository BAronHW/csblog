import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './output.css'
import Header from './Components/Header'

function App() {
  const [darkmode , setdarkmode] = useState(true);

  return (
    <div className={`${darkmode ? "bg-slate-700 text-cyan-600 min-h-screen" : "bg-lightmode text-cyan-600 min-h-screen"}`}>
      <Header darkmode={darkmode} setdarkmode={setdarkmode}></Header>
    </div>
  )
}

export default App
