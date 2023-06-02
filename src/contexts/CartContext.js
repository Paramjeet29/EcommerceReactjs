import React,{createContext,useState,useEffect} from 'react';

export const CartContext=createContext();

const CartProvider = ({children}) => {
  //cart state
  const [cart,setCart]=useState([]);

  // item amount state
  const [itemAmount,setItemAmount]=useState(0);

  //total price state
  const[total,setTotal]=useState(0); 

  useEffect(()=>{
    const total=cart.reduce((accumulator,currentItem)=>{
      return accumulator+currentItem.price*currentItem.amount;
    },0);
    setTotal(total);
  })

  //update item amount
  useEffect(()=>{
    if(cart){
      const amount=cart.reduce((accumulator,currentItem)=>
      {
        return accumulator+currentItem.amount;
      },0);
      setItemAmount(amount);
    }
  },[cart]);


  //add to cart
  const addToCart=(product,id)=>{
    // ... is a spread operator that means it will copy all the properties of product in newItem
    const newItem={...product,amount:1};
   
    //to check if the item is already in the cart
    const cartItem=cart.find((item)=>{
      return item.id===id;
    });

    // if cart item is already in the cart
    if(cartItem){
      const newCart= [...cart].map(item=>{
        if(item.id===id){
          return {...item,amount:cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }else{
      setCart([...cart,newItem]);
    }
  };

  //
  const removeFromCart=(id)=>{
    const newCart=cart.filter(item=>{
      return item.id!==id;
    });
    setCart(newCart);
  }

  //clear whole cart 
  const clearCart=()=>{
    setCart([]);
  };

  //increase the amount of the cart in the sidebar
  const increaseAmount=(id)=> {
    const cartItem=cart.find(item=>item.id===id);
    addToCart(cartItem,id);
    // console.log(`item ${id} amount increased`);
  }
  
  //decrease amount of the items in the cart
  const decreaseAmount=(id)=>{
    const cartItem=cart.find((item)=>{
    return item.id===id
    });

    if(cartItem){
      const newCart=cart.map((item)=>{
        if(item.id===id){
          return {...item,amount:cartItem.amount-1};
        }
        else{
          return item;
        }
      });
      setCart(newCart);
    }
      if(cartItem.amount<2){
        removeFromCart(id);
      }
    
  
  }
  // console.log(cart);
  return( <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart,increaseAmount,decreaseAmount,itemAmount,total }
  }>{children}</CartContext.Provider>);
};

export default CartProvider;
