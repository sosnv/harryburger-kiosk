// src/pages/Cart.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import { Trash2 } from "lucide-react";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function Cart() {
  const { basket, addToBasket, removeFromBasket, orderType } =
    useContext(BasketContext);
  const navigate = useNavigate();

  const increaseQuantity = (item) => {
    addToBasket({ ...item, quantity: 1 });
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      removeFromBasket(item.id, false);
    }
  };

  const removeItem = (item) => removeFromBasket(item.id, true);

  const total = basket.reduce((acc, item) => {
    const extra = orderType === "naWynos" && item.category !== "drinks" ? 1 : 0;
    return acc + (item.price + extra) * item.quantity;
  }, 0);

  const handleGoToPayment = () =>
    navigate("/payment", { state: { basket, orderType } });

  return (
    <div className="min-h-screen bg-[#0d0c0c] text-gray-100 py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10">
          Twój koszyk
        </h1>

        {basket.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl mb-6">Twój koszyk jest pusty.</p>
            <Link to="/">
              <Button className="px-8 py-4 text-lg bg-yellow-500 hover:bg-yellow-600 text-white">
                Wróć do sklepu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 gap-10">
            {/* ---------- LISTA PRODUKTÓW ---------- */}
            <div className="lg:col-span-2 space-y-6">
              {basket.map((item) => (
                <Card key={item.id} className="bg-[#1a1a1a] p-8 text-gray-100">
                  <div className="flex items-start justify-between gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2">
                        {item.name}
                      </h3>

                      {item.meat && (
                        <p className="text-lg text-gray-400 mb-1">
                          {item.meat === "smash90" && "Mięso: Smash 90g"}
                          {item.meat === "smash170" && "Mięso: Smash 170g"}
                          {item.meat === "beef" && "Mięso: Wołowina"}
                          {item.meat === "chicken" && "Mięso: Kurczak"}
                        </p>
                      )}

                      <p className="text-lg text-gray-400 mb-4">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 flex items-center justify-center border-[#d4af37] text-[#d4af37] text-3xl hover:bg-[#d4af37]/10"
                          onClick={() => decreaseQuantity(item)}
                        >
                          –
                        </Button>

                        <span className="text-2xl font-medium">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-12 w-12 flex items-center justify-center border-[#d4af37] text-[#d4af37] text-3xl hover:bg-[#d4af37]/10"
                          onClick={() => increaseQuantity(item)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <span className="text-2xl font-bold">
                        {(item.price * item.quantity).toFixed(2)} zł
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-400 flex items-center gap-2 text-lg"
                        onClick={() => removeItem(item)}
                      >
                        <Trash2 className="h-6 w-6" /> Usuń
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* ---------- PODSUMOWANIE ---------- */}
            <div className="lg:col-span-1">
              <Card className="bg-[#1a1a1a] p-8 text-gray-100">
                <h2 className="text-2xl font-semibold mb-6">Podsumowanie</h2>

                <div className="space-y-5">
                  <div className="flex justify-between text-lg">
                    <span>Typ zamówienia</span>
                    <span className="font-medium">
                      {orderType === "naWynos" ? "Na wynos" : "Na miejscu"}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span>Suma częściowa</span>
                    <span className="font-medium">{total.toFixed(2)} zł</span>
                  </div>

                  <hr className="border-gray-700" />

                  <div className="flex justify-between text-2xl font-bold">
                    <span>Razem</span>
                    <span>{total.toFixed(2)} zł</span>
                  </div>

                  <Button
                    onClick={handleGoToPayment}
                    className="w-full mt-6 py-4 text-xl bg-red-600 hover:bg-red-500 text-white"
                  >
                    Przejdź do kasy
                  </Button>

                  <Link to="/">
                    <Button className="w-full mt-6 py-4 text-xl bg-yellow-500 hover:bg-yellow-600 text-white">
                      Kontynuuj zakupy
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
