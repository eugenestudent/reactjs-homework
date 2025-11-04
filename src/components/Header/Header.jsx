import { useState } from 'react';
import './Header.css';
import logoSrc from '../../assets/icons/logo.svg';
import cartSrc from '../../assets/icons/cart-icon.svg';

const navigationItems = ['Home', 'Menu', 'Company', 'Login'];

function Header({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (quantity) => {
    setCartCount(prevCount => prevCount + quantity);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          
          <div className="logo">
            <img src={logoSrc} alt="Logo" />
          </div>

          <nav className="navigation">
            {navigationItems.map((item) => (
              <button key={item} className="nav-button">
                {item}
              </button>
            ))}
          </nav>

          <div className="cart-container">
            <div className="cart-icon">
              <img src={cartSrc} alt="Cart" className="cart-svg" />
              <span className="cart-counter">{cartCount}</span>
            </div>
          </div>
        </div>
      </header>
      {children(addToCart)}
    </>
  );
}

export default Header;