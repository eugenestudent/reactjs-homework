import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { selectCartItems, removeFromCart } from '../../store/cartSlice';
import './Order.css';

function Order() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleOrder = () => {
    alert('Order placed successfully. Thank you for your order!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="order-page">
        <div className="order-background-shape"></div>
        <h1 className="order-page-title">Finish your order</h1>
        <div className="order-container">
          <p className="order-empty">Your cart is empty (｡•́︿•̀｡)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-background-shape"></div>
      <h1 className="order-page-title">Finish your order</h1>
      <div className="order-container">
        <div className="order-items">
          {cartItems.map((item) => (
            <div key={item.id} className="order-item">
              <div className="order-item-image">
                <img src={item.img} alt={item.meal} />
              </div>
              <div className="order-item-name">{item.meal}</div>
              <div className="order-item-price">$ {(item.price * item.quantity).toFixed(2)} USD</div>
              <input
                type="number"
                className="order-item-quantity"
                value={item.quantity}
                disabled
              />
              <button 
                className="order-item-remove"
                onClick={() => handleRemove(item.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="order-form">
        <div className="form-row">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="house">House</label>
          <input
            id="house"
            type="text"
            value={house}
            onChange={(e) => setHouse(e.target.value)}
          />
        </div>
      </div>

      <div className="order-actions">
        <Button variant="primary" onClick={handleOrder}>
          Order
        </Button>
      </div>
    </div>
  );
}

export default Order;