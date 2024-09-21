import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import WelcomeScreen from './pages/Welcome';
import Home from './pages/Home';
import { AppProvider, useApp } from './Contexts/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieDetail from './Components/MovieDetail';

const ProtectedRoute = ({ children }) => {
	const { user } = useApp();
	const accessToken = localStorage.getItem('accessToken');

	return accessToken ? children : <Navigate to='/' />;
};

function App() {
	return (
		<AppProvider>
			<Router>
				<ToastContainer position='top-right' autoClose={3000} />
				<Routes>
					<Route path='/' element={<WelcomeScreen />} />
					<Route
						path='/home'
						element={
							<Home />
							// <ProtectedRoute>
							// 	<Home />
							// </ProtectedRoute>
						}
					/>
					<Route path='/movie/:id' element={<MovieDetail />} />
				</Routes>
			</Router>
		</AppProvider>
	);
}

export default App;