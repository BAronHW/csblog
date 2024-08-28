import React from 'react';
import { Moon, LogIn, Sun, LogOut, PlusCircle } from 'lucide-react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { provider } from '../Firebase';
import { useNavigate } from 'react-router';

const Header = ({
  darkmode,
  setdarkmode,
  setLoggedIn,
  loggedIn,
  username,
  setUsername,
  profilePic,
  setProfilepic,
  setuser,
  setIsAdmin,
  isAdmin
}) => {
  const navigate = useNavigate();

  const handledarkmodeclick = () => {
    setdarkmode(!darkmode);
  }

  const handlesigninclick = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setuser(user);
        setLoggedIn(true);
        setUsername(user.displayName);
        setProfilepic(user.photoURL);
        // Check if the user is an admin here
        checkIfAdmin(user.uid);
      }).catch((error) => {
        console.error("Sign-in error:", error);
      });
  }

  const handlelogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setLoggedIn(false);
      setProfilepic("");
      setUsername("");
      setIsAdmin(false);
      navigate('/')
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  }

  const handleaddclick = () => {
    navigate('/create')
  }

  // Function to check if user is admin
  const checkIfAdmin = (uid) => {
    const adminUUID = import.meta.env.VITE_ADMIN_UUID || "fKjaTf50t7UZhxknIl93zM8HbAr1";
    setIsAdmin(uid === adminUUID);
  }

  return (
    <header className={`${darkmode ? "bg-gray-800 text-white" : "bg-lightmodeheader text-gray-800"} sticky top-0 z-50 shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1
            className="text-2xl font-bold cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-r from-white via-yellow-300 to-purple-500 bg-clip-text hover:text-transparent"
            onClick={() => {navigate('/')}}
          >
            Aaron's Blog
          </h1>
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-full ${darkmode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
              aria-label="Toggle dark mode"
              onClick={handledarkmodeclick}
            >
              {darkmode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
           
            {loggedIn ? (
              <>
                <div className="flex items-center space-x-2 bg-opacity-50 bg-gray-200 rounded-full p-1 pr-3">
                  <img src={profilePic} alt={username} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-sm font-medium ">{username}</span>
                </div>
                <button
                  className="inline-flex items-center px-4 py-2 rounded-md bg-red-600 hover:bg-red-700"
                  onClick={handlelogout}
                >
                  <LogOut className="mr-2" size={16} />
                  Logout
                </button>
              </>
            ) : (
              <button
                className={`inline-flex items-center px-4 py-2 rounded-md ${darkmode? " bg-indigo-600 hover:bg-indigo-700" : "bg-lightmodeloginbutton hover:bg-opacity-70"}`}
                onClick={handlesigninclick}
              >
                <LogIn className="mr-2" size={16} />
                Login
              </button>
            )}
            <a href="https://baron-web.netlify.app/" className="hover:underline">My Portfolio Website</a>
            {loggedIn && isAdmin && (
              <button 
                className='bg-green-400 p-2 rounded-full hover:bg-green-500 transition-colors duration-200'
                onClick={handleaddclick}
              >
                <PlusCircle className='' size={22}/>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;