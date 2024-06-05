import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useMsal } from '@azure/msal-react';
import { getCart, updateCart } from '../services/cartService';
import { CartItem } from '../models/CartItem';

interface CartContextProps {
    cart: CartItem[];
    addItemToCart: (item: CartItem) => Promise<void>;
    removeItemFromCart: (productId: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { instance, accounts } = useMsal();
    const account = accounts[0];

    useEffect(() => {
        const fetchCart = async () => {
            try {
                // Fetch cart from localStorage
                const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
                setCart(localCart ?? []);

                if (account || true) {
                    const backendCart = await getCart(instance, accounts);
                    const {mergedCart, isUpdated} = mergeCarts(localCart, backendCart);
                    if(isUpdated) {
                        setCart(mergedCart ?? []);

                        // Update localStorage with merged cart
                        localStorage.setItem('cart', JSON.stringify(mergedCart));
    
                        // Persist merged cart to backend
                        await updateCart(instance, accounts, mergedCart);
                    }
                    

                }
            } catch (error) {
                console.error('Failed to fetch cart:', error);
            }
        };

        fetchCart();
    }, []);

    const mergeCarts = (localCart: CartItem[], backendCart: CartItem[]): {mergedCart: CartItem[], isUpdated:boolean} => {
        const mergedCart = [...localCart];
        let isUpdated = false;
        backendCart.forEach(backendItem => {
            const localItem = mergedCart.find(item => item.productId === backendItem.productId);
            if (!localItem) {
                isUpdated = true;
                mergedCart.push(backendItem);
            }
        });

        return {mergedCart, isUpdated};
    };

    const addItemToCart = async (item: CartItem) => {
        let updatedCart = cart;
        const existingItem = updatedCart.find(cartItem => cartItem.productId === item.productId);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            updatedCart = [...cart, item];
        }

        setCart(updatedCart ?? []);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        if (account || true) {
            await updateCart(instance, accounts, updatedCart);
        }
    };

    const removeItemFromCart = async (productId: number) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        setCart(updatedCart ?? []);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        if (account || true) {
            await updateCart(instance, accounts, updatedCart);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart }}>
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
