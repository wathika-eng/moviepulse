import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../Contexts/AppContext';

function LoginModal({ isOpen, onClose }) {
  const [formData, setFormData ] = useState({
    'username': '',
    'email': '',
    'password': ''
  })
  const [ isRegister, setIsRegister ] = useState(false);

  const navigate = useNavigate();
  const { login } = useApp()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]:value})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted', formData);
    login(formData)
    navigate('/home')
    onClose();
  };

  const toggleIsRegister = () => {
    setIsRegister(!isRegister);
  }


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 max-w-md">
        <div className='flex justify-end text-purple-600 cursor-pointer' onClick={toggleIsRegister}>{isRegister? 'Login' : 'Register'}</div>
        <h2 className="text-2xl font-bold mb-6 text-center">{isRegister? 'Sign Up' : 'Sign In'}</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <div className={`${isRegister ? "mb-4" : "hidden"}`}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded font-semibold hover:bg-purple-700 transition duration-300">
            {isRegister ? 'Submit': 'Login'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-sm text-gray-600 hover:text-gray-800 w-full text-center">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;