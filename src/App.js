import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewSubmissions from './pages/ViewSubmissions';
import ApplicationStatus from './pages/ApplicationStatus';
import CategoriesManager from './pages/CategoriesManager'; // Import CategoriesManager
import RegionsManager from './pages/RegionsManager'; // Import RegionsManager
import './styles/styles.css';
import './App.css';

function App() {
  return (
    <div className='main-app'>
      <Router>
        <Navbar />
        <div className='main-container'>
        <Routes>
          <Route path="/" element={<ViewSubmissions />} />
          <Route path="/status" element={<ApplicationStatus />} />
          <Route path="/categories" element={<CategoriesManager />} /> {/* Add CategoriesManager */}
          <Route path="/regions" element={<RegionsManager />} /> {/* Add RegionsManager */}
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
