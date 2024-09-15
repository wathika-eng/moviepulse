
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/Welcome';
import Home from './pages/Home';
import { AppProvider } from './Contexts/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<WelcomeScreen />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
