import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import MenuItem from '../MenuItem/MenuItem';
import useFetch from '../../hooks/useFetch';
import './Menu.css';

const INITIAL_ITEMS_COUNT = 6;
const ITEMS_INCREMENT = 6;

function Menu({ addToCart }) {
  const { loading, data: menuItems, fetchData } = useFetch();
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Dessert');
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS_COUNT);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    if (menuItems) {
      const dessertItems = menuItems.filter(item => item.category === 'Dessert');
      setFilteredItems(dessertItems);
    }
  }, [menuItems]);

  const fetchMenuItems = async () => {
    try {
      await fetchData('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals');
    } catch (err) {
      console.error('Failed to fetch menu items:', err);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(INITIAL_ITEMS_COUNT);
    
    if (menuItems) {
      const filtered = menuItems.filter(item => item.category === category);
      setFilteredItems(filtered);
    }
  };

  const handleSeeMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_INCREMENT);
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
            <MenuItem 
              key={item.id} 
              item={item} 
              onAddToCart={addToCart}
            />
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
