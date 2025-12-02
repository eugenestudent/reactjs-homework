import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Order from './components/Order/Order';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (quantity) => {
    setCartCount(prevCount => prevCount + quantity);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header cartCount={cartCount} />
          <Routes>
            <Route path="/" element={<Hero addToCart={addToCart} />} />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/order" 
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
