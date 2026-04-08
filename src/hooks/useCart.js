import { useState, useCallback, useMemo } from 'react';

export function useCart() {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((servico) => {
    setCart(prev => [...prev, { ...servico, cartId: Math.random() }]);
  }, []);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.preco, 0),
    [cart]
  );

  return { cart, addToCart, removeFromCart, clearCart, cartTotal };
}
