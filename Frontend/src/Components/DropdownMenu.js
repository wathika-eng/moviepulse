
function DropdownMenu() {
return (
    <div className="flex flex-col space-y-4 py-2 ">
        <span className="hover:bg-gray-400 px-2">Home</span>
        <span className="hover:bg-gray-400 px-2">Favorites</span>
        <span className="hover:bg-gray-400 px-2">Trending</span>
        <span className="hover:bg-gray-400 px-2">Logout</span>
    </div>
)
}

export default DropdownMenu;