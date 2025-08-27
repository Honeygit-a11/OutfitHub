import { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  all_product.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const [discount, setDiscount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  const coupons={
    HONEY07:10,
    FIRST07:20,
    DHONI07:40,
    WELCOME07:30,
    FORDER07: 5,
};
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId]? prev[itemId]+1:1,
     }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };


  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (Product) => Product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };
  //apply coupon
  const applyCoupon = (code) =>{
      const coupon = coupons[code.toUpperCase()];
      if(coupon){
        setDiscount(coupon);
        return true;
      } else{
        setDiscount(0);
        return false;
      }
  };

  const getFinalAmount = () =>{
    let total = getTotalCartAmount();
    if(discount <= 100){
      return total -(total * discount)/100;
    }else{
      return total - discount + deliveryCharge;
    }
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    applyCoupon,
    discount,
    setDiscount,
    getFinalAmount,
    deliveryCharge,
    setDeliveryCharge,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
