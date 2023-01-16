import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';



export interface CartState {
    cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
    cart: []
}

export const CartProvider: FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
      // validar la cookie
      try {
        const cookieProducts = Cookie.get("cart") ? JSON.parse(Cookie.get('cart')! ): []
        dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts});        
      } catch (error) {
        dispatch({type: '[Cart] - LoadCart from cookies | storage', payload: []}); 
      }
        
    }, []);

    useEffect(() => {
      if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));
      
    }, [state.cart]);
    


    const addProductToCart = (product: ICartProduct) => {
      const productInCart = state.cart.some(p => p._id === product._id);
      if(!productInCart) return dispatch({type: '[Cart] - Update products un cart', payload: [...state.cart, product]})

      const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
      if(!productInCartButDifferentSize) return dispatch({type: '[Cart] - Update products un cart', payload: [...state.cart, product]})

      // acumular
      const updatedProducts = state.cart.map(p => {
          if(p._id !== product._id) return p;
          if(p.size !== product.size) return p;

          // actualizar la cantidad
          p.quantity +=  product.quantity;     
          return p;
      });

      dispatch ({type: '[Cart] - Update products un cart', payload: updatedProducts});
    }

    const updateCartQuantity = (product: ICartProduct) => {
      dispatch({type: '[Cart] - Change cart quantity', payload: product});
    }

    const removeCartProduct = (product: ICartProduct) => {
      dispatch({ type: "[Cart] - Remove product in carty", payload: product });
        
    };

    return (
        <CartContext.Provider
            value={{
                ...state,

                //metodos
                addProductToCart,
                updateCartQuantity,
                removeCartProduct,
            }}>
            {children}
        </CartContext.Provider>
    );
}