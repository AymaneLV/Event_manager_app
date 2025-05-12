import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Page Components
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import MyTickets from './pages/MyTickets';
import YourEvents from './pages/YourEvents';
import Categories from './pages/Categories';
import EventsByCategory from './pages/EventsByCategory';
import Error404 from './pages/Error404';
import AllEvents from './pages/AllEvents';
import ContactUS from './pages/ContactUs';
import FAQ from './pages/FAQ';
import SearchPage from './pages/SearchPage';

// Protected Route
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/events" element={<EventsByCategory />} />
            <Route path="/all-events" element={<AllEvents />} />
            <Route path="/contactus" element={<ContactUS />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/search" element={<SearchPage />} />

            {/* Protected Routes */}
            <Route 
              path="/my-tickets" 
              element={
                <ProtectedRoute>
                  <MyTickets />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/create" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CreateEvent />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/your-events" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <YourEvents />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;