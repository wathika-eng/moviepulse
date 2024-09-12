import React from 'react';
import { FaHome, FaHeart, FaFire, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const SidebarPage = () => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
            <ul className="flex-1">
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                    <FaHome className="text-blue-500 mr-3" />
                    <span>Home</span>
                </li>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                    <FaHeart className="text-red-500 mr-3" />
                    <span>Favorites</span>
                </li>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                    <FaFire className="text-yellow-500 mr-3" />
                    <span>Trending</span>
                </li>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                    <FaCalendarAlt className="text-green-500 mr-3" />
                    <span>Coming Soon</span>
                </li>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                    <FaUsers className="text-purple-500 mr-3" />
                    <span>Community</span>
                </li>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                    <FaCog className="text-gray-400 mr-3" />
                    <span>Social Settings</span>
                </li>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                    <FaSignOutAlt className="text-red-600 mr-3" />
                    <span>Log Out</span>
                </li>
            </ul>
        </div>
    );
};

export default SidebarPage;
