import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BasketContext } from "../context/BasketContext";
import Button from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import ScrollArea from "../components/ui/ScrollArea";
import { ShoppingCart } from "lucide-react";
import burgers from "../data/burgers";
import extras from "../data/extras";
import ufoBurgers from "../data/ufo-burgers";
import { motion, useAnimation } from "framer-motion";

/****************************
 *  MenuItemCard – pojedynczy produkt
 ***************************/
const MenuItemCard = ({ item, onAdd }) => {
  const [meat, setMeat] = useState(null);
  const [size, setSize] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const [errorText, setErrorText] = useState("");

  const getCurrentPrice = () => {
    if (item.prices && item.sizes) {
      const current = size ? item.prices[size] : null;
      return current ? current.toFixed(2) : "0.00";
    }
    if (item.prices && item.availableMeats) {
      const current = meat ? item.prices[meat] : item.prices.smash90;
      return current ? current.toFixed(2) : "0.00";
    }
    return item.price ? item.price.toFixed(2) : "0.00";
  };

  const validateAndAdd = () => {
    if (item.availableMeats && !meat) {
      setErrorText("Proszę wybrać rodzaj mięsa.");
      setErrorModal(true);
      return;
    }
    if (item.sizes && !size) {
      setErrorText("Proszę wybrać rozmiar.");
      setErrorModal(true);
      return;
    }
    onAdd({
      ...item,
      meat: meat || null,
      size: size || null,
      price: getCurrentPrice(),
    });
  };

  return (
    <>
      <motion.div
        className="overflow-hidden flex flex-col h-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className="bg-cover bg-center bg-no-repeat border border-gray-700 shadow-md flex flex-col h-full text-white"
          style={{ backgroundImage: "url('/images/new/bg.webp')" }}
        >
          {/* zdjęcie */}
          <CardHeader className="bg-transparent p-8 border-none flex justify-center items-center">
            <motion.img
              src={item.image}
              alt={item.name}
              className="object-contain w-[80%] h-[80%] transform scale-110"
              whileHover={{ scale: 1.1 }}
            />
          </CardHeader>

          {/* content */}
          <CardContent className="p-4 pt-0 flex flex-col flex-1 justify-between items-center text-center overflow-hidden border-none">
            <div className="mb-4 flex-1 overflow-hidden">
              <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 mb-2 truncate">
                {item.name}
              </CardTitle>
            </div>

            {/* mięso */}
            {item.availableMeats && (
              <div className="mb-6 text-lg w-full">
                <p className="font-semibold mb-2 text-gray-200">
                  Wybierz mięso:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.keys(item.prices).map((meatType) => (
                    <motion.div
                      key={meatType}
                      onClick={() => setMeat(meatType)}
                      className={`cursor-pointer px-4 py-2 border flex items-center justify-center h-12 text-base md:text-lg select-none ${
                        meat === meatType
                          ? "border-yellow-500 bg-yellow-100 text-yellow-600 font-bold"
                          : "border-gray-600 text-gray-200"
                      }`}
                      whileTap={{ scale: 0.95 }}
                    >
                      {
                        {
                          smash90: "Smash 90g",
                          smash170: "Smash 170g",
                          beef: "Wołowina",
                          chicken: "Kurczak",
                        }[meatType]
                      }
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* rozmiar */}
            {item.sizes && (
              <div className="mb-6 text-lg w-full">
                <p className="font-semibold mb-2 text-gray-200">
                  Wybierz rozmiar:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {item.sizes.map((s) => {
                    const key = s.split(" ")[0];
                    return (
                      <motion.div
                        key={s}
                        onClick={() => setSize(key)}
                        className={`cursor-pointer px-4 py-2 border flex items-center justify-center h-12 text-base md:text-lg select-none ${
                          size === key
                            ? "border-red-500 bg-red-100 text-red-600 font-bold"
                            : "border-gray-600 text-gray-200"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        {s}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* cena + dodaj */}
            <div className="mt-auto flex flex-col md:flex-row justify-between items-center w-full px-4 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-gray-100">
                {getCurrentPrice()} zł
              </span>
              <Button
                onClick={validateAndAdd}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 md:px-8 md:py-4 text-xl md:text-2xl"
              >
                <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 mr-2" />
                Dodaj
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* modal błędu */}
      {errorModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg text-center w-11/12 md:w-auto text-gray-100"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6">{errorText}</h2>
            <Button
              onClick={() => setErrorModal(false)}
              className="bg-red-600 hover:bg-red-500 text-white px-8 py-3"
            >
              OK
            </Button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

/*****************
 *  MENU – główna
 *****************/
const menuCategories = [
  { id: "burgers", name: "Burgery", image: "/images/side-burger.png" },
  { id: "ufoBurgers", name: "UFO Burgery", image: "/images/ufo-klasyczne.png" },
  { id: "extras", name: "Dodatki", image: "/images/side-dodatki.png" },
];

export default function Menu() {
  const location = useLocation();
  const { addToBasket, basket, setOrderType } = useContext(BasketContext);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [itemToAdd, setItemToAdd] = useState(null);
  const [activeSection, setActiveSection] = useState("burgers");
  const [isAnimating, setIsAnimating] = useState(false);

  const notificationRef = useRef(null);
  const cartButtonRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (location.state?.orderType) setOrderType(location.state.orderType);
  }, [location, setOrderType]);

  const handleAddToBasketClick = (itemWithOptions) => {
    setItemToAdd(itemWithOptions);
    setShowConfirmDialog(true);
  };

  const confirmAddToBasket = () => {
    if (!itemToAdd) return;
    addToBasket({ ...itemToAdd, id: `${itemToAdd.id}-${Date.now()}` });
    setShowConfirmDialog(false);
    setShowAddedNotification(true);
    setIsAnimating(true);
  };

  const animateNotification = async () => {
    if (!notificationRef.current || !cartButtonRef.current) return;
    await new Promise((r) => setTimeout(r, 800));
    const notif = notificationRef.current.getBoundingClientRect();
    const cart = cartButtonRef.current.getBoundingClientRect();
    const deltaX = cart.left + cart.width / 2 - (notif.left + notif.width / 2);
    const deltaY = cart.top + cart.height / 2 - (notif.top + notif.height / 2);
    await controls.start({
      x: deltaX,
      y: deltaY,
      scale: 0.2,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    });
    setShowAddedNotification(false);
    controls.set({ x: 0, y: 0, scale: 1, opacity: 1 });
    setIsAnimating(false);
  };

  useEffect(() => {
    if (showAddedNotification) animateNotification();
  }, [showAddedNotification]);

  const renderCategory = (items, key) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {items.map((item) => (
        <MenuItemCard
          key={`${key}-${item.id}`}
          item={item}
          onAdd={handleAddToBasketClick}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#0d0c0c] text-gray-100">
      {/* panel boczny */}
      <div className="w-80 bg-[#1a1a1a] border-r border-[#2a2a2a] shadow-lg hidden md:flex flex-col">
        <div className="p-4 flex justify-center items-center">
          <img src="/logo.png" alt="Logo" className="w-24 h-24" />
        </div>
        <ScrollArea className="h-[calc(100vh-120px)]">
          {menuCategories.map((c) => (
            <Button
              key={c.id}
              variant="ghost"
              className={`rounded-none flex flex-col items-center justify-center w-full h-32 transition-colors ${
                activeSection === c.id
                  ? "bg-[#2a2a2a] text-yellow-500 font-bold"
                  : "bg-[#1a1a1a] text-gray-300 hover:bg-[#262626]"
              }`}
              onClick={() => {
                document
                  .getElementById(c.id)
                  .scrollIntoView({ behavior: "smooth" });
                setActiveSection(c.id);
              }}
            >
              <motion.img
                src={c.image}
                alt={c.name}
                className="w-20 h-20 mb-3 object-cover"
                whileHover={{ scale: 1.1 }}
              />
              <span className="text-2xl uppercase">{c.name}</span>
            </Button>
          ))}
        </ScrollArea>
      </div>

      {/* treść */}
      <div className="flex-1 overflow-auto p-4 md:p-10 space-y-20">
        <section id="burgers">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-100">
            Burgery
          </h1>
          {renderCategory(burgers, "burgers")}
        </section>
        <section id="ufoBurgers">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-100">
            UFO Burgery
          </h1>
          {renderCategory(ufoBurgers, "ufoBurgers")}
        </section>
        <section id="extras">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-100">
            Dodatki
          </h1>
          {renderCategory(extras, "extras")}
        </section>
      </div>

      {/* przycisk koszyka */}
      <motion.div
        ref={cartButtonRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-0 left-0 right-0 md:bottom-6 md:right-6 md:left-auto w-full md:w-auto"
      >
        <Button
          className="bg-red-600 hover:bg-red-500 text-white text-xl md:text-2xl px-4 py-3 md:px-10 md:py-5 rounded-none md:rounded-xl shadow-lg"
          disabled={isAnimating}
        >
          <Link to="/cart" state={{ cart: basket }}>
            Przejdź do koszyka ({basket.length})
          </Link>
        </Button>
      </motion.div>

      {/* potwierdzenie dodania */}
      {showConfirmDialog && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-[#1a1a1a] p-8 rounded-lg shadow-lg text-center w-11/12 md:w-auto text-gray-100"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              Czy na pewno chcesz dodać produkt do koszyka?
            </h2>
            <div className="flex justify-center gap-6">
              <Button
                onClick={confirmAddToBasket}
                className="bg-green-600 hover:bg-green-500 text-white px-8 py-3"
              >
                Tak
              </Button>
              <Button
                onClick={() => setShowConfirmDialog(false)}
                className="bg-red-600 hover:bg-red-500 text-white px-8 py-3"
              >
                Nie
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* notyfikacja ✓ */}
      {showAddedNotification && (
        <motion.div
          className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            ref={notificationRef}
            className="bg-[#1a1a1a] p-6 rounded-full shadow-lg flex items-center justify-center"
            animate={controls}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
          >
            <motion.span
              className="text-green-500 text-5xl font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              ✓
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
