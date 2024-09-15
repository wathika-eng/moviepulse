import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import welcomeBackground from "../images/welcome-background.jpg";
// import LoginModal from '../components/LoginModal';

const WelcomeScreen = () => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);


    const toggleLoginModal = () => {
      setIsModalOpen(!isModalOpen);
    }
  
    return (
        <div 
          className="flex items-center justify-center min-h-screen bg-cover bg-center bg-opacity-90"
          style={{ 
            backgroundColor: 'rgba(43, 19, 55, .5)', // This is the hex equivalent of rgb(43, 19, 55)
            backgroundImage: `linear-gradient(90deg, rgba(43, 19, 55, 0.9), rgba(43, 19, 55, 0.5)), url(${welcomeBackground})` 
          }}
       >
          <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">WATCH</h1>
              <p className="text-sm text-gray-300 mb-8">Enjoy the latest movies</p>
              <button 
                onClick={toggleLoginModal}
                className="bg-purple-600 text-white px-12 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition duration-300 mb-4 w-full"
              >
                Log in
              </button>
              <Link to={'/home'} className="text-gray-400 text-xs">
                Continue without log in
              </Link>
          </div>
          {/* { isModalOpen ? <LoginModal isOpen={isModalOpen} onClose={toggleLoginModal}  /> : null} */}
      </div>
    );
  };
  
  export default WelcomeScreen;