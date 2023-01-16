import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

interface ContextProps {
    cart: ICartProduct[];
    numberOfItmes: number;
    subTotal: number;
    tax: number;
    total: number;

    //metodos
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);