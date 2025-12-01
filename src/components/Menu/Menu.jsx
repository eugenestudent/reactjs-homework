import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import './Menu.css';

function Menu({ addToCart }) {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dessert');
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setMenuItems(data);
      
      const dessertItems = data.filter(item => item.category === 'Dessert');
      setFilteredItems(dessertItems);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6);
    
    const filtered = menuItems.filter(item => item.category === category);
    setFilteredItems(filtered);
  };

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!addToCart) return;
    
    const formData = new FormData(event.target);
    const quantity = parseInt(formData.get('quantity') || 1);
    
    if (quantity > 0) {
      addToCart(quantity);
    }  
  };

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMoreItems = visibleCount < filteredItems.length;

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
          <Button 
            variant="secondary" 
            active={selectedCategory === 'Dessert'} 
            className="category-button"
            onClick={() => handleCategoryChange('Dessert')}
          >
            Dessert
          </Button>
          <Button 
            variant="secondary" 
            active={selectedCategory === 'Dinner'}
            className="category-button"
            onClick={() => handleCategoryChange('Dinner')}
          >
            Dinner
          </Button>
          <Button 
            variant="secondary" 
            active={selectedCategory === 'Breakfast'}
            className="category-button"
            onClick={() => handleCategoryChange('Breakfast')}
          >
            Breakfast
          </Button>
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
                
                <form className="menu-item-actions" onSubmit={handleSubmit}>
                  <input 
                    type="number" 
                    name="quantity"
                    className="menu-item-quantity" 
                    defaultValue="1" 
                    min="1"
                    required
                  />
                  <Button 
                    type="submit"
                    variant="primary"
                    className="menu-item-add-button"
                  >
                    Add to cart
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>

        {hasMoreItems && (
          <div className="menu-footer">
            <Button 
              variant="primary"
              className="menu-see-more-button" 
              onClick={handleSeeMore}
            >
              See more
            </Button>
          </div>
        )}
        
      </div>
    </section>
  );
}

export default Menu;
