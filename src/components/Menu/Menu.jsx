import { useState, useEffect, useRef } from 'react';
import './Menu.css';

function Menu({ addToCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const quantityRefs = useRef({});

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals');
      
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      
      const data = await response.json();
      
      const dessertItems = data.filter(item => item.category === 'Dessert');
      setMenuItems(dessertItems);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const handleAddToCart = (itemId) => {
    if (!addToCart) return;
    
    const quantity = parseInt(quantityRefs.current[itemId]?.value || 1);
    if (quantity > 0) {
      addToCart(quantity);
    }
  };

  const visibleItems = menuItems.slice(0, visibleCount);
  const hasMoreItems = visibleCount < menuItems.length;

  if (loading) {
    return (
      <section className="menu">
        <div className="menu-container">
          <p className="menu-loading">Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="menu">
        <div className="menu-container">
          <p className="menu-error">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="menu">
      <div className="menu-background-shape"></div>
      <div className="menu-container">
        
        <div className="menu-header">
          <h2 className="menu-title">Browse our menu</h2>
          <p className="menu-subtitle">
            Use our menu to place an order online, or <span className="phone-tooltip-wrapper"><a href="tel:999-999-999" className="menu-link">phone</a><span className="phone-tooltip">999-999-999</span></span> our store to place a pickup order. Fast and fresh food.
          </p>
        </div>

        <div className="menu-categories">
          <button className="category-button category-button-active">Desert</button>
          <button className="category-button">Dinner</button>
          <button className="category-button">Breakfast</button>
        </div>

        <div className="menu-grid">
          {visibleItems.map((item) => (
            <div key={item.id} className="menu-item">
              <div className="menu-item-image-container">
                <img src={item.img} alt={item.meal} className="menu-item-image" />
              </div>
              
              <div className="menu-item-content">
                <div className="menu-item-header">
                  <h3 className="menu-item-name">{item.meal}</h3>
                  <span className="menu-item-price">$ {item.price.toFixed(2)} USD</span>
                </div>
                
                <p className="menu-item-description">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                
                <div className="menu-item-actions">
                  <input 
                    type="number" 
                    className="menu-item-quantity" 
                    defaultValue="1" 
                    min="1"
                    ref={el => quantityRefs.current[item.id] = el}
                  />
                  <button 
                    className="menu-item-add-button"
                    onClick={() => handleAddToCart(item.id)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMoreItems && (
          <div className="menu-footer">
            <button className="menu-see-more-button" onClick={handleSeeMore}>
              See more
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
}

export default Menu;