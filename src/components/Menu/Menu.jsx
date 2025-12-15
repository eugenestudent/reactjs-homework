import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';
import MenuItem from '../MenuItem/MenuItem';
import {
  fetchMenuItems,
  setSelectedCategory,
  showMoreItems,
  selectMenuLoading,
  selectSelectedCategory,
  selectVisibleItems,
  selectHasMoreItems,
} from '../../store/menuSlice';
import './Menu.css';

function Menu() {
  const dispatch = useDispatch();
  const loading = useSelector(selectMenuLoading);
  const selectedCategory = useSelector(selectSelectedCategory);
  const visibleItems = useSelector(selectVisibleItems);
  const hasMoreItems = useSelector(selectHasMoreItems);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSeeMore = () => {
    dispatch(showMoreItems());
  };

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
