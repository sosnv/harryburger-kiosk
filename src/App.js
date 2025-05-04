// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { BasketProvider } from "./context/BasketContext";
import Welcome from "./pages/Welcome";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

function App() {
  return (
    <BasketProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BasketProvider>
  );
}

export default App;
