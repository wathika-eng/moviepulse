import SidebarPage from '../Components/SidebarPage';
import TopBar from '../Components/TopBar';
import Catalogue from '../Components/Catalogue';
import { useApp } from '../Contexts/AppContext';
import Header from '../Components/Header';

function Home() {
	const { user } = useApp();

	return (
		<div className='md:flex flex-row '>
			<div className={`${user ? 'hidden md:flex' : 'hidden'}`}>
				<SidebarPage />
			</div>
			<div
				className={`${user ? 'md:ml-44 basis-11/12' : 'w-full'} bg-[#0d1f33]`}>
				<Header />
				<Catalogue />
			</div>
		</div>
	);
}

export default Home;
