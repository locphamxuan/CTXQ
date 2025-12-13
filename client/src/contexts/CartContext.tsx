import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const isProcessingRef = useRef(false);
  const lastAddTimeRef = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    // Load cart từ localStorage
    const loadCart = () => {
      try {
        const cartStr = localStorage.getItem('cart');
        if (cartStr) {
          const cartData = JSON.parse(cartStr);
          console.log('Loaded cart from localStorage:', cartData);
          setItems(cartData);
        } else {
          console.log('No cart found in localStorage');
        }
      } catch (err) {
        console.error('Error loading cart from localStorage:', err);
        setItems([]);
      }
    };

    loadCart();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cart') {
        loadCart();
      }
    };

    // Listen for custom event
    const handleCartChange = () => {
      loadCart();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cart-change', handleCartChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cart-change', handleCartChange);
    };
  }, []);

  const saveCart = (newItems: CartItem[]) => {
    try {
      // Convert image objects to strings if needed
      const itemsToSave = newItems.map(item => ({
        ...item,
        image: typeof item.image === 'string' ? item.image : (item.image as any)?.src || String(item.image)
      }));
      localStorage.setItem('cart', JSON.stringify(itemsToSave));
      setItems(itemsToSave);
      window.dispatchEvent(new Event('cart-change'));
      console.log('Cart saved to localStorage:', itemsToSave);
    } catch (err) {
      console.error('Error saving cart:', err);
    }
  };

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    const now = Date.now();
    const lastAddTime = lastAddTimeRef.current[item.id] || 0;
    const timeSinceLastAdd = now - lastAddTime;

    // Prevent double calls within 500ms for the same item
    if (timeSinceLastAdd < 500) {
      console.log('addToCart: Too soon since last add, skipping...', {
        itemId: item.id,
        timeSinceLastAdd
      });
      return;
    }

    // Prevent if already processing
    if (isProcessingRef.current) {
      console.log('addToCart: Already processing, skipping...');
      return;
    }

    try {
      isProcessingRef.current = true;
      lastAddTimeRef.current[item.id] = now;
      console.log('addToCart called with:', item);
      
      setItems((prevItems) => {
        // Double check to prevent race conditions
        const existingItem = prevItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          const updatedItems = prevItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
          console.log('Updated cart (existing item):', updatedItems);
          saveCart(updatedItems);
          return updatedItems;
        } else {
          const newItems = [...prevItems, { ...item, quantity: 1 }];
          console.log('Updated cart (new item):', newItems);
          saveCart(newItems);
          return newItems;
        }
      });

      // Reset processing flag after a delay
      setTimeout(() => {
        isProcessingRef.current = false;
      }, 500);
    } catch (err) {
      console.error('Error in addToCart:', err);
      isProcessingRef.current = false;
      delete lastAddTimeRef.current[item.id];
      throw err;
    }
  }, []);

  const removeFromCart = (id: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((i) => i.id !== id);
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems((prevItems) => {
      const newItems = prevItems.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    console.error('useCart must be used within a CartProvider');
    // Return a mock implementation to prevent crashes
    return {
      items: [],
      addToCart: () => console.warn('CartProvider not found'),
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      getTotal: () => 0,
      getItemCount: () => 0
    };
  }
  return context;
}

