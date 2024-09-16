import { Bell } from 'lucide-react';
import DropdownMenu from './DropdownMenu';

function Header () {
  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <span className='text-2xl font-bold'>Movie Pulse</span>
      <div className="flex items-center space-x-4">
        <Bell className="cursor-pointer hover:text-white"  size={28} />
        <DropdownMenu username="Tatiana" />
      </div>
    </header>
  );
};

export default Header;