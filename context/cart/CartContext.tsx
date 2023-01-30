import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItmes: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress;

    // Orders
    createOrder: () => Promise<{hasError: boolean; message: string;}>;

    //metodos
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    UpdateAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);