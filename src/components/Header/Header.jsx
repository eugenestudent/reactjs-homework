import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { selectCartItemCount } from '../../store/cartSlice';
import { selectCurrentUser, logoutUser } from '../../store/authSlice';
import './Header.css';
import logoSrc from '../../assets/icons/logo.svg';
import cartSrc from '../../assets/icons/cart-icon.svg';

function Header() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartItemCount);
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleCartClick = () => {
    navigate('/order');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        
        <div className="logo" onClick={() => handleNavClick('/')} style={{ cursor: 'pointer' }}>
          <img src={logoSrc} alt="Logo" />
        </div>

        <nav className="navigation">
          <Button 
            variant="secondary" 
            className="nav-button"
            onClick={() => handleNavClick('/')}
            active={isActive('/')}
          >
            Home
          </Button>
          <Button 
            variant="secondary" 
            className="nav-button"
            onClick={() => handleNavClick('/menu')}
            active={isActive('/menu')}
          >
            Menu
          </Button>
          <Button 
            variant="secondary" 
            className="nav-button"
          >
            Company
          </Button>
          {currentUser ? (
            <Button 
              variant="secondary" 
              className="nav-button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button 
              variant="secondary" 
              className="nav-button"
              onClick={() => handleNavClick('/login')}
              active={isActive('/login')}
            >
              Login
            </Button>
          )}
        </nav>

        <div className="cart-container" onClick={handleCartClick} style={{ cursor: 'pointer' }}>
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
