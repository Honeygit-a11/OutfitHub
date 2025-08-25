import React, { useContext } from 'react'
import '../Billing.jsx/Billing.css'
import { ShopContext } from '../../context/shopcontext'
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const {getTotalCartAmount} = useContext(ShopContext);
  const navigate = useNavigate();
  const promiseFee = 10;

  const handleCheckout =()=>{
    navigate('/checkout');
  }
  return (
    <>
    <div className='cartitem-1'>
      <div className="cartitems-total">
            <h1 style={{color:"grey"}}>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Protect promise fee</p>
                <p>{promiseFee}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>₹{getTotalCartAmount()+ promiseFee}</h3>
              </div>
            </div>
            <button onClick={() =>handleCheckout()}>PROCEED TO CHECKOUT</button>
          </div>
    </div>
      
    </>
  )
}

export default Billing;