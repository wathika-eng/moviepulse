import SidebarPage from "../components/SidebarPage";
import TopBar from "../components/TopBar";
import Catalogue from "../components/Catalogue";
import { useApp } from "../Contexts/AppContext";

function Home() {
    const { user } = useApp();

    return (
        <div className="md:flex flex-row bg-[#102942] ">
            <div className={`${user ? 'hidden md:flex fixed basis basis-1/6' : 'hidden'}`}>
                <SidebarPage />
            </div>
            <div className={`${user ? 'md:ml-40  basis-11/12' : 'w-full'}`}>
                <TopBar  />
                <Catalogue />
            </div>
        </div>
    );
};

export default Home;