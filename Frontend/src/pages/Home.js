import SidebarPage from "../components/SidebarPage.js";
import TopBar from "../components/TopBar.js";
import Catalogue from "../components/Catalogue.js";
import { useApp } from "../Contexts/AppContext.js";

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