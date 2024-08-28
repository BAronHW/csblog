// App.jsx
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './output.css';
import Header from './Components/Header';
import Login from './Components/Login';
import BlogList from './Components/BlogList';
import Footer from './Components/Footer';

export const ThemeContext = createContext(null); // Export ThemeContext

function App() {
  const [darkmode, setdarkmode] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [currentUserUUID, setCurrentUserUUID] = useState(null);
  const [profilePic, setProfilepic] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setuser] = useState({});

  const checkIfAdmin = (uuid) => {
    console.log("Checking admin status for UUID:", uuid);
    if (!uuid) {
      console.log("No UUID provided, not an admin");
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
    <ThemeContext.Provider value={darkmode}>
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
          />
          <Routes>
            <Route path='/' element={<BlogList isAdmin={isAdmin} />} />
          </Routes>
          <div>Admin status: {isAdmin ? "Admin" : "Not Admin"}</div>
          <Footer></Footer>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
