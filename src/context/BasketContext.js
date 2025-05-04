import React, { createContext, useState } from "react";

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [orderType, setOrderType] = useState(""); // Typ zamówienia: na wynos lub na miejscu

  const addToBasket = (item) => {
    setBasket((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.meat === item.meat
      );
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.meat === item.meat
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromBasket = (id, removeCompletely = false) => {
    setBasket((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: removeCompletely ? 0 : item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const value = {
    basket,
    orderType,
    setOrderType, // Funkcja ustawiająca typ zamówienia
    addToBasket,
    removeFromBasket,
    clearBasket,
  };

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};
