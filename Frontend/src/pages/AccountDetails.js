import React, { useState } from 'react';
import Home from './Home';

const AccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState({
    name: 'Tatiana',
    email: 'tatiana@example.com',
    password: '********',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the account details
    console.log('Updated account details:', accountDetails);
    // Show a success message to the user
    alert('Account details updated successfully!');
  };

  return (
    <Home>
        <div className='px-4  h-full flex  items-center '>
            <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-500">Account Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label htmlFor="name" className="block font-bold   text-gray-300">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={accountDetails.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md h-12 px-2 bg-gray-800 border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                </div>
                <div>
                <label htmlFor="email" className="block font-bold   text-gray-300">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={accountDetails.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md h-12 px-2 bg-gray-800 border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                </div>
                <div>
                <label htmlFor="password" className="block font-bold   text-gray-300">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={accountDetails.password}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md h-12 px-2 bg-gray-800 border-gray-700 text-white shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
                />
                </div>
                <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    Update Account
                </button>
                </div>
            </form>
            </div>
        </div>
    </Home>
  );
};

export default AccountDetails;