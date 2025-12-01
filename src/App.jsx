import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  const addToCart = (quantity) => {
    setCartCount(prevCount => prevCount + quantity);
  };

  const navigateToMenu = () => {
    setCurrentPage('menu');
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="App">
      <Header 
        cartCount={cartCount} 
        onMenuClick={navigateToMenu}
        onHomeClick={navigateToHome}
        currentPage={currentPage}
      />
      {currentPage === 'home' ? (
        <Hero addToCart={addToCart} />
      ) : (
        <Menu addToCart={addToCart} />
      )}
      <Footer />
    </div>
  );
}

export default App;
