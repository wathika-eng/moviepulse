import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import WelcomeScreen from './pages/Welcome';
import Home from './pages/Home';
import { AppProvider, useApp } from './Contexts/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieDetail from './Components/MovieDetail';
import DropdownMenu from './Components/DropdownMenu';
import Favourite from './Components/Favourite';
const ProtectedRoute = ({ children }) => {
	const { user } = useApp();
	const accessToken = localStorage.getItem('accessToken');

	return accessToken ? children : <Navigate to='/' />;
};

function App() {
	const accessToken = localStorage.getItem('accessToken');
	let username = '';

	if (accessToken) {
		try {
			const decodedToken = jwtDecode(accessToken);
			username = decodedToken.username;
		} catch (error) {
			console.error('Error decoding token:', error);
		}
	}

	return (
		<AppProvider>
			<Router>
				<ToastContainer position='top-right' autoClose={3000} />
				<Routes>
					<Route path='/' element={<WelcomeScreen />} />
					<Route
						path='/home'
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route path='/movie/:id' element={<MovieDetail />} />
					<Route path='/logout' element={<Navigate to='/' />} />
					<Route
						path='/account'
						element={
							<ProtectedRoute>
								<DropdownMenu username={username} />
							</ProtectedRoute>
						}
					/>
					<Route path='/favorites' element={<Favourite />} />
				</Routes>
			</Router>
		</AppProvider>
	);
}

export default App;
