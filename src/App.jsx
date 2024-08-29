import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './output.css';
import Header from './Components/Header';
import Login from './Components/Login';
import BlogList from './Components/BlogList';
import Footer from './Components/Footer';
import CreateCard from './Components/CreateCard';
import ErrorPage from './Components/ErrorPage';
import BlogDetailPage from './Components/BlogDetailPage';

export const ThemeContext = createContext(null);

function App() {
  const [darkmode, setdarkmode] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [currentUserUUID, setCurrentUserUUID] = useState(null);
  const [profilePic, setProfilepic] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setuser] = useState({});

  const checkIfAdmin = (uuid) => {
    if (!uuid) {
      setIsAdmin(false);
      return;
    }
    const adminUUID = import.meta.env.VITE_ADMIN_UUID || "fKjaTf50t7UZhxknIl93zM8HbAr1";
    console.log("Admin UUID:", adminUUID);
    if (uuid === adminUUID) {
      console.log("User is admin");
      setIsAdmin(true);
    } else {
      console.log("User is not admin");
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const thisuid = user.uid;
    checkIfAdmin(thisuid);
  }, [loggedIn]);

  return (
    <ThemeContext.Provider value={{darkmode, isAdmin, loggedIn}}>
      <Router>
        <div className={`${darkmode ? "bg-slate-700 text-cyan-600 min-h-screen" : "bg-lightmode text-cyan-600 min-h-screen"}`}>
          <Header
            darkmode={darkmode}
            setdarkmode={setdarkmode}
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
            username={username}
            setUsername={setUsername}
            profilePic={profilePic}
            setProfilepic={setProfilepic}
            setCurrentUserUUID={setCurrentUserUUID}
            setuser={setuser}
            setIsAdmin={setIsAdmin}
            isAdmin={isAdmin}
          />
          <Routes>
            <Route path='/' element={<BlogList isAdmin={isAdmin} />} />
            <Route 
              path='/create' 
              element={isAdmin && <CreateCard />} 
            />
            <Route path='/error' element={<ErrorPage />} />
            <Route path='/blog/:id' element={<BlogDetailPage />}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;