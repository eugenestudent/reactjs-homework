import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (quantity) => {
    setCartCount(prevCount => prevCount + quantity);
  };

  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <Menu addToCart={addToCart} />
      <Footer />
    </div>
  );
}

export default App;
