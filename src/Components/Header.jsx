import React, { useState } from 'react';
import { Moon, LogIn, Sun, LogOut} from 'lucide-react';
import { auth } from '../Firebase'
import { provider } from '../Firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Header = ({darkmode, setdarkmode, setLoggedIn, loggedIn, username, setUsername, profilePic, setProfilepic}) => {

    const handledarkmodeclick = () =>{
        setdarkmode(!darkmode)
        console.log(darkmode);
    }

    const handlesigninclick =() =>{
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setLoggedIn(true);
          setUsername(user.displayName);
          setProfilepic(user.photoURL);
          console.log(user)
          
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }

    const handlelogout = () =>{
      const auth = getAuth();
      signOut(auth).then(() => {
        setLoggedIn(false);
      }).catch((error) => {
        console.log(error);
      });
    }
    
  return (
    <header className={`${darkmode ? "bg-white dark:bg-gray-800 shadow-sm" : "bg-lightmodeheader"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Aaron's Blog
          </h1>
          <div className="flex space-x-2">
            <div className='flex justify-center items-center'>
              <button
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-label="Toggle dark mode"

                onClick={handledarkmodeclick}
              >
                {darkmode ? <Moon size={20} /> : <Sun size={20}/>}
              </button>
            </div>
            
            <div className='flex justify-center items-center'>
              {loggedIn ?
              <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handlesigninclick}
            >
              <LogOut className="mr-2 -ml-1" size={20} />
              Logout
            </button>
              :
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handlesigninclick}
              >
                <LogIn className="mr-2 -ml-1" size={20} />
                Login
              </button>
              }
            </div>
            <div className="flex items-center space-x-2 bg-opacity-50 bg-gray-700 rounded-full p-1 pr-3">
                {loggedIn ? (
                  <img src={profilePic} alt={username} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className='p-2'></div>
                )}
                <span className="text-sm font-medium text-white">{username}</span>
              </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;