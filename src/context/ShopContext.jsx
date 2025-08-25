import { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [CartItems, setCartItems] = useState(getDefaultCart());

  // ✅ All coupons here
  const coupons = [
    { code: "SAVE10", discount: 10 },
    { code: "DISCOUNT20", discount: 20 },
    { code: "NEW50", discount: 50 },
  ];

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // ✅ Reusable function to apply coupon
  const applyCoupon = (code) => {
    const coupon = coupons.find((c) => c.code === code.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      return { success: true, message: `Coupon "${code}" applied!` };
    } else {
      setAppliedCoupon(null);
      return { success: false, message: "Invalid coupon code" };
    }
  };

  // Add to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  // ✅ Billing calculation function
  const getBillingDetails = () => {
    let subtotal = 0;

    for (const item in CartItems) {
      if (CartItems[item] > 0) {
        let itemInfo = all_product.find(
          (Product) => Product.id === Number(item)
        );
        subtotal += itemInfo.new_price * CartItems[item];
      }
    }

    let discount = appliedCoupon ? appliedCoupon.discount : 0;
    let total = Math.max(0, subtotal - discount);

    return {
      subtotal,
      discount,
      total,
      appliedCoupon,
    };
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in CartItems) {
      if (CartItems[item] > 0) {
        totalItem += CartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    all_product,
    CartItems,
    addToCart,
    removeFromCart,
    applyCoupon,       // ✅ use this to apply coupon anywhere
    appliedCoupon,     // ✅ info about current coupon
    getBillingDetails, // ✅ single billing function for everywhere
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
