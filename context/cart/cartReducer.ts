import { ICartProduct } from '../../interfaces';
import { CartState } from './';


type CartActionType =
  | { type: '[Cart] - LoadCart from cookies | storage', payload: ICartProduct[] }
  | { type: '[Cart] - Update products un cart', payload: ICartProduct[] }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {

  switch (action.type) {
    case '[Cart] - LoadCart from cookies | storage':
      return {
        ...state,
      }
    
    case '[Cart] - Update products un cart':
      return {
        ...state,
        cart: [ ...action.payload ]
      }

    default:
      return state;
  }

}