import React from 'react';
import { Moon, LogIn, Sun, LogOut } from 'lucide-react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { provider } from '../Firebase';

const Header = ({darkmode, setdarkmode, setLoggedIn, loggedIn, username, setUsername, profilePic, setProfilepic}) => {

    const handledarkmodeclick = () => {
        setdarkmode(!darkmode);
    }

    const handlesigninclick = () => {
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          setLoggedIn(true);
          setUsername(user.displayName);
          setProfilepic(user.photoURL);
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
      }).catch((error) => {
        console.error("Logout error:", error);
      });
    }
    
  return (
    <header className={`${darkmode ? "bg-gray-800 text-white" : "bg-lightmodeheader text-gray-800"} shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">
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
                className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
                onClick={handlesigninclick}
              >
                <LogIn className="mr-2" size={16} />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;