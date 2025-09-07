import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/CartPage.css';

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role, id } = useParams();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cart/${role}/${id}`);
        const data = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [role, id]);

  const handleQuantityChange = async (item, action) => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/change/${role}/${id}/${item.medicine_name}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newQuantity: action }), // Send "plus" or "minus"
        }
      );

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Failed to update quantity');
        return;
      }

      const updatedItem = await response.json();

      // Update cart state with backend response
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.medicine_name === updatedItem.medicine_name
            ? { ...cartItem, quantity: updatedItem.quantity, price: updatedItem.price, stock: updatedItem.stock }
            : cartItem
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cart/checkout/${role}/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        const { alert: alertMsg, error } = await response.json();
        alert(alertMsg || error || 'Checkout failed');
        return;
      }

      alert('Checkout successful! Thank you for your purchase.');
      setCartItems([]);
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred during checkout. Please try again.');
    }
  };

  if (loading) return <p>Loading cart items...</p>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.medicine_name}</h3>
              <p>Price: ${item.price?.toFixed(2) ?? '0.00'}</p>
              <p>Stock: {item.stock ?? 0}</p>
              <div className="quantity-control">
                <button
                  onClick={() => handleQuantityChange(item, "minus")}
                  disabled={(item.quantity ?? 1) <= 1}
                >
                  -
                </button>
                <span>{item.quantity ?? 1}</span>
                <button
                  onClick={() => handleQuantityChange(item, "plus")}
                  disabled={(item.quantity ?? 1) >= (item.stock ?? 0)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="total-price">
            Total: $
            {cartItems
              .reduce((total, item) => total + (item.price ?? 0), 0)
              .toFixed(2)}
          </div>
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
