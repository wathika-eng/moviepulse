import SidebarPage from "../Components/SidebarPage";
import TopBar from "../Components/TopBar";
import Catalogue from "../Components/Catalogue";
import { useApp } from "../Contexts/AppContext";

function Home() {
    const { user } = useApp();

    return (
        <div className="md:flex flex-row ">
                <div className={`${user ? null : 'hidden'}`}>
                    <SidebarPage />
                </div>
            <div className={`${user ? 'md:ml-44 basis-11/12' : 'w-full'} bg-[#102942]`}>
                <TopBar  />
                <Catalogue />
            </div>
        </div>
    );
};

export default Home;