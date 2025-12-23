import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import UsersList from './components/UsersList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/" className="nav-link">Registration</Link>
          <Link to="/users" className="nav-link">View All Registrations</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;