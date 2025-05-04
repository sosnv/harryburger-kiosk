// src/pages/Payment.jsx
import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { BasketContext } from "../context/BasketContext";
import Button from "../components/ui/Button";
import { FaCoins } from "react-icons/fa"; // Ikona monety

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { basket, clearBasket, orderType } = useContext(BasketContext);
  const cart = location.state?.cart || basket;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const generateOrderNumber = () => {
    let orderNum = parseInt(localStorage.getItem("orderNumber")) || 1;
    orderNum = orderNum >= 99 ? 1 : orderNum + 1;
    localStorage.setItem("orderNumber", orderNum);
    return orderNum;
  };

  const handlePayment = async () => {
    if (!customerName) {
      alert("Proszę wpisać imię.");
      return;
    }
    if (!paymentMethod) {
      alert("Proszę wybrać metodę płatności.");
      return;
    }

    const orderNum = generateOrderNumber();

    try {
      await addDoc(collection(db, "orders"), {
        items: cart,
        paymentMethod,
        customerName,
        orderNumber: orderNum,
        timestamp: serverTimestamp(),
        status: "pending",
        orderType,
      });

      setOrderNumber(orderNum);
      setShowSummary(true);
      clearBasket();

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      console.error("Błąd podczas składania zamówienia: ", error);
      alert("Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0c0c] p-4 flex flex-col items-center justify-center text-gray-100">
      {showSummary ? (
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg text-center w-full max-w-md">
          <h2 className="text-3xl font-bold mb-4">Dziękujemy za zamówienie!</h2>
          <p className="text-xl mb-2">
            Numer zamówienia:{" "}
            <span className="font-bold text-4xl text-yellow-500">
              {orderNumber}
            </span>
          </p>
          <p className="text-lg mb-4">Imię: {customerName}</p>
          <p className="text-gray-400">Proszę czekać na wywołanie numeru.</p>
        </div>
      ) : (
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Wybierz metodę płatności
          </h1>

          <div className="flex justify-center mb-6 space-x-6">
            <div
              onClick={() => setPaymentMethod("cash")}
              className={`cursor-pointer p-6 w-32 h-32 flex flex-col items-center justify-center border-2 rounded-lg transition-colors ${
                paymentMethod === "cash"
                  ? "border-yellow-500 bg-[#1a1a1a]"
                  : "border-gray-700 bg-[#1a1a1a]/50"
              }`}
            >
              <FaCoins className="text-4xl mb-2 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-100">
                Gotówka
              </span>
            </div>

            <div
              onClick={() => setPaymentMethod("blik")}
              className={`cursor-pointer p-6 w-32 h-32 flex flex-col items-center justify-center border-2 rounded-lg transition-colors ${
                paymentMethod === "blik"
                  ? "border-yellow-500 bg-[#1a1a1a]"
                  : "border-gray-700 bg-[#1a1a1a]/50"
              }`}
            >
              <span className="text-4xl mb-2 font-bold text-yellow-500">
                BLIK
              </span>
              <span className="text-lg font-semibold text-gray-100">BLIK</span>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Wpisz swoje imię"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 bg-[#1a1a1a] rounded-lg text-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-yellow-500"
            />
          </div>

          <Button
            onClick={handlePayment}
            className="w-full px-8 py-4 bg-yellow-500 text-white rounded-lg text-xl hover:bg-yellow-600"
          >
            Potwierdź zamówienie
          </Button>
        </div>
      )}
    </div>
  );
}
