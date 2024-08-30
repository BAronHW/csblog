import React, { useState } from 'react';
import { Moon, LogIn, Sun, LogOut, PlusCircle, Menu, X } from 'lucide-react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { provider } from '../Firebase';
import { useNavigate, Link } from 'react-router-dom';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      navigate('/');
    }).catch((error) => {
      console.error("Logout error:", error);
    });
  }

  const handleaddclick = () => {
    navigate('/create');
  }

  const checkIfAdmin = (uid) => {
    const adminUUID = import.meta.env.VITE_ADMIN_UUID || "fKjaTf50t7UZhxknIl93zM8HbAr1";
    setIsAdmin(uid === adminUUID);
  }

  const NavItem = ({ text, to }) => (
    <Link
      to={to}
      className='group text-inherit transition duration-300 hover:text-blue-500'
      onClick={() => setIsMenuOpen(false)}
    >
      {text}
      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-blue-500"></span>
    </Link>
  );

  return (
    <header className={`${darkmode ? "bg-gray-800 text-white" : "bg-lightmodeheader text-gray-800"} sticky top-0 z-50 shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-2xl font-bold cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text hover:text-transparent"
          >
            Aaron's Blog
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavItem text="Home" to="/" />
            <NavItem text="Blogs" to="/blog" />
          </div>

          <div className="flex items-center space-x-4">
            <button
              className={`p-2 rounded-full transition-colors duration-200 ${darkmode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
              aria-label="Toggle dark mode"
              onClick={handledarkmodeclick}
            >
              {darkmode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {loggedIn ? (
                <>
                  <div className="flex items-center space-x-2 bg-opacity-50 bg-gray-200 rounded-full p-1 pr-3">
                    <img src={profilePic} alt={username} className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm font-medium">{username}</span>
                  </div>
                  <button
                    className="inline-flex items-center px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white"
                    onClick={handlelogout}
                  >
                    <LogOut className="" size={16} />
                  </button>
                </>
              ) : (
                <button
                  className={`inline-flex justify-center items-center px-4 py-2 rounded-md transition-colors duration-200 ${darkmode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                  onClick={handlesigninclick}
                >
                  <LogIn className="" size={16} />
                </button>
              )}
              {loggedIn && isAdmin && (
                <button 
                  className='bg-green-500 p-2 rounded-full hover:bg-green-600 transition-colors duration-200 text-white'
                  onClick={handleaddclick}
                  aria-label="Add Post"
                >
                  <PlusCircle size={22}/>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavItem text="Home" to="/" />
            <NavItem text="Blogs" to="/blog" />
            {loggedIn ? (
              <>
                <div className="flex items-center space-x-2 bg-opacity-50 bg-gray-200 rounded-full p-1 pr-3">
                  <img src={profilePic} alt={username} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-sm font-medium ">{username}</span>
                </div>
                <button
                  className="w-full text-left px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                  onClick={handlelogout}
                >
                  <LogOut className="mr-2 inline" size={16} />
                  Logout
                </button>
              </>
            ) : (
              <button
                className={`w-full text-left px-4 py-2 rounded-md ${darkmode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white transition-colors duration-200`}
                onClick={handlesigninclick}
              >
                <LogIn className="mr-2 inline" size={16} />
                Login
              </button>
            )}
            {loggedIn && isAdmin && (
              <button 
                className='w-full text-left bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 text-white'
                onClick={handleaddclick}
              >
                <PlusCircle className='mr-2 inline' size={22}/>
                Add Post
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;