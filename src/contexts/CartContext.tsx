import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getCart, updateCart } from '../services/cartService';
import { CartItem } from '../models/CartItem';
import { useApplication } from './ApplicationContext';
import { PrintSize } from '../enums/PrintSize';
import { trackEvent } from '../services/applicationInsightService';


interface CartContextProps {
    cart: CartItem[];
    addItemToCart: (item: CartItem) => Promise<void>;
    removeItemFromCart: (productId: number, frameId: number, size: PrintSize) => Promise<void>;
    cartTotal: number;
    taxTotal: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);
    const [taxTotal, setTaxTotal] = useState<number>(0);
    const { getToken, } = useApplication();

    useEffect(() => {
        const newCartTotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
        setCartTotal(newCartTotal);
        setTaxTotal(newCartTotal * 0.21);
    }, [cart]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                // Fetch cart from localStorage
                const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
                setCart(localCart ?? []);

                const backendCart = await getCart(await getToken());
                const { mergedCart, isUpdated } = mergeCarts(localCart, backendCart);
                if (isUpdated) {
                    setCart(mergedCart ?? []);

                    // Update localStorage with merged cart
                    localStorage.setItem('cart', JSON.stringify(mergedCart));

                    // Persist merged cart to backend
                    await updateCart(await getToken(), mergedCart);
                }
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        };

        fetchCart();
    }, []);

    const mergeCarts = (localCart: CartItem[], backendCart: CartItem[]): { mergedCart: CartItem[], isUpdated: boolean } => {
        const mergedCart = [...localCart];
        let isUpdated = false;
        backendCart.forEach(backendItem => {
            const localItem = mergedCart.find(item => item.productId === backendItem.productId);
            if (!localItem) {
                isUpdated = true;
                mergedCart.push(backendItem);
            }
        });

        return { mergedCart, isUpdated };
    };

    const addItemToCart = async (item: CartItem) => {

        trackEvent('Add to Cart', `Product: ${item.productName}, Size: ${item.size}, Frame: ${item.frameName}, Quantity: ${item.quantity}`);
        let updatedCart = [...cart];

        const existingItem = updatedCart.find(cartItem => cartItem.productId === item.productId && cartItem.size === item.size && cartItem.frameId === item.frameId);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            updatedCart = [...cart, item];
        }

        setCart(updatedCart ?? []);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        await updateCart(await getToken(), updatedCart);
    };

    const removeItemFromCart = async (productId: number, frameId: number, size: PrintSize) => {
        const updatedCart = cart.filter(item => item.productId !== productId || item.size !== size || item.frameId !== frameId);
        setCart(updatedCart ?? []);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        await updateCart(await getToken(), updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, cartTotal, taxTotal }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
