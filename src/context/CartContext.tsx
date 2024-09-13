import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types';


interface CartItem extends Book {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (book: Book) => void;
    removeFromCart: (bookId: number) => void;
    increaseQuantity: (bookId: number) => void;
    decreaseQuantity: (bookId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (book: Book) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === book.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...book, quantity: 1 }];
        });
    };

    const increaseQuantity = (bookId: number) => {
        setCart(prevCart => (
            prevCart.map(item => item.id === bookId ? { ...item, quantity: item.quantity + 1 } : item))
        )
    }

    const decreaseQuantity = (bookId: number) => {
        const itemToDecrease = cart.find(item => item.id === bookId)
        if (itemToDecrease) {
            if (itemToDecrease.quantity === 1) {
                removeFromCart(bookId)
            } else {
                setCart(prevCart => (
                    prevCart.map(item => item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item))
                )
            }
        }
    }

    const removeFromCart = (bookId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== bookId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};