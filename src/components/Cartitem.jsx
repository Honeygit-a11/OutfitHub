import React, { useContext } from "react";
import "../Style/Cartitem.css";
import remove_icon from "../components/Assets/cart_cross_icon.png";
import { ShopContext } from "../context/shopcontext";
import { useNavigate } from "react-router-dom";
import Billing from "./Billing.jsx/Billing";
const Cartitem = () => {
  const { all_product, CartItems, removeFromCart } = useContext(ShopContext);
  
  return (
    <>
      <div className="cartitems">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e) => {
          if (CartItems[e.id] > 0) {
            return (
              <div>
                <div className="cartitems-format cartitems-format-main">
                  <img
                    src={e.image}
                    alt=""
                    className="carticon-product-icon"
                  />
                  <p>{e.name}</p>
                  <p>₹{e.new_price}</p>
                  <button className="cartitems-quantity">
                    {CartItems[e.id]}
                  </button>
                  <p>₹{e.new_price * CartItems[e.id]}</p>
                  <img
                    src={remove_icon}
                    onClick={() => {
                      removeFromCart(e.id);
                    }}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            )
          }
          return null;

        })}
        <div className="cartitems-down">
          <Billing/>
          {/* <div className="cartitems-total">
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
          </div> */}
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartitem;
