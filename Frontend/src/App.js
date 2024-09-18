import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/Welcome';
import AccountDetails from './pages/AccountDetails';
import { AppProvider } from './Contexts/AppContext';
import Catalogue from './pages/Catalogue';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeScreen />} />
          <Route path='/home' element={<Catalogue />} />
          <Route path='/account' element={<AccountDetails />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
