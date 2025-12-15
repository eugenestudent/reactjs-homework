import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { addToCart } from '../../store/cartSlice';
import './MenuItem.css';

function MenuItem({ item }) {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const quantity = parseInt(formData.get('quantity') || 1);
    
    if (quantity > 0) {
      dispatch(addToCart({ item, quantity }));
    }
  };

  return (
    <div className="menu-item">
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
  );
}

export default MenuItem;