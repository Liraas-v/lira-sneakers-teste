import { useState, useCallback, useMemo } from "react";

export function useCart() {
  const [cart, setCart] = useState([]);
  const addToCart = useCallback(
    (s) => setCart((p) => [...p, { ...s, cartId: Math.random() }]),
    [],
  );
  const removeFromCart = useCallback(
    (id) => setCart((p) => p.filter((i) => i.cartId !== id)),
    [],
  );
  const clearCart = useCallback(() => setCart([]), []);
  const cartTotal = useMemo(
    () => cart.reduce((a, i) => a + i.preco, 0),
    [cart],
  );
  return { cart, addToCart, removeFromCart, clearCart, cartTotal };
}
