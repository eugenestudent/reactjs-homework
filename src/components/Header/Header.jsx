import Button from '../Button/Button';
import './Header.css';
import logoSrc from '../../assets/icons/logo.svg';
import cartSrc from '../../assets/icons/cart-icon.svg';

const navigationItems = ['Home', 'Menu', 'Company', 'Login'];

function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="header-container">
        
        <div className="logo">
          <img src={logoSrc} alt="Logo" />
        </div>

        <nav className="navigation">
          {navigationItems.map((item) => (
            <Button key={item} variant="secondary" className="nav-button">
              {item}
            </Button>
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
  );
}

export default Header;
