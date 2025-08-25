import { createContext, useState } from "react";
import all_product from "../components/Assets/all_product";
import Cartitem from "../components/Cartitem";
import Product from "../pages/Product";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart={};
    for (let index =0; index < all_product.length+1; index++){
        cart[index]= 0;
    }
    return cart;
}
const ShopContextProvider =(props)=>{
    const [CartItems,setCartItems] = useState(getDefaultCart());
    const addToCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        console.log(CartItems);
    }
        const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    };
    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        for(const item in CartItems)
        {
            if(CartItems[item]>0)
            {
                let itemInfo = all_product.find((Product)=>Product.id=== Number(item))
                totalAmount += itemInfo.new_price * CartItems[item];
            }
        }
        return totalAmount;
    }
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in CartItems)
        {
            if(CartItems[item]>0)
            {
                totalItem+= CartItems[item];
            }
        }
        return totalItem;
    }
    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,CartItems,addToCart,removeFromCart};
    
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};
export default ShopContextProvider;