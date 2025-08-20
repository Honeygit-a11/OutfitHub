import React, { useContext } from 'react'
import '../Billing.jsx/Billing.css'
import { ShopContext } from '../../context/shopcontext'
import { useNavigate } from 'react-router-dom';
const Billing = (props) => {
  const {getTotalCartAmount} = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCheckout =()=>{
    navigate('/checkout');
  }
  return (
    <>
    <div className='cartitem-1'>
      <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>₹{getTotalCartAmount()}</h3>
              </div>
            </div>
            <button onClick={() =>handleCheckout()}>PROCEED TO CHECKOUT</button>
          </div>
    </div>
      
    </>
  )
}

export default Billing;
