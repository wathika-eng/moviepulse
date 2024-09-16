import React from 'react';
import { FaHome, FaHeart, FaFire, FaCalendarAlt, FaSignOutAlt, FaRegClock } from 'react-icons/fa';

const SidebarPage = () => {
    return (
        <div className="w-44 border-r border-gray-700 h-screen bg-gray-800 text-white flex flex-col fixed">
            {/* Watch Icon Heading */}
            <div className="flex items-center p-4 bg-gray-900 border-b border-gray-700">
                <FaRegClock className="text-yellow-400 text-2xl mr-3" />
                <span className="text-lg font-semibold">Watch List</span>
            </div>

            {/* Top Section: Home, Favorites, Trending, Coming Soon */}
            <ul className="flex-1 mt-4">
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
            </ul>

            {/* Bottom Section: Logout */}
            <div className="flex flex-col mt-auto border-t border-gray-700">
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                    <FaSignOutAlt className="text-red-600 mr-3" />
                    <span>Log Out</span>
                </li>
            </div>
        </div>
    );
};

export default SidebarPage;