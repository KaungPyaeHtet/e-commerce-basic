import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Prices from "./pages/Prices.jsx";
import Clothes from "./components/Clothes";
import Women from "./pages/clothes/Women.jsx";
import Men from "./pages/clothes/Men.jsx";
import Child from "./pages/clothes/Child.jsx";
import Context from "./components/Context";
import Cloth from "./pages/Cloth.jsx";
import Cart from "./components/Cart";

import Jacket1 from "./assets/clothes/men/jacket-2.jpg";
import Shirt2 from "./assets/clothes/men/shirt-2.jpg";
import RedDress from "./assets/clothes/women/red-dress.jpg";
import GoldDress from "./assets/clothes/women/gold-dress.jpg";
import GreenDress from "./assets/clothes/women/green-dress.jpg";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [currencyType, setCurrencyType] = useState("kyats");
  const [selected, setSelected] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [cartCount, setCartCount] = useState();
  useEffect(() => {
    setCartCount(cart.length);
  }, [cart]);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Brown jacket leather",
      category: "clothes",
      group: "jacket",
      type: "men",
      price: 10000,
      image: Jacket1,
      description:
        "Step into timeless style with this Brown Leather Jacket, a perfect blend of rugged durability and sophisticated elegance. Crafted from premium, full-grain leather, this jacket offers a rich, earthy brown hue that exudes warmth and versatility. The sleek, tailored fit ensures a flattering silhouette, while the soft, supple texture provides unmatched comfort",
      rating: 4.0,
      wish: false,
      cart: false,
    },
    {
      id: 2,
      name: "Clean white shirt",
      category: "clothes",
      group: "shirt",
      type: "men",
      price: 20000,
      image: Shirt2,
      description: "Men wear shirt, shirt for the best",
      rating: 5.0,
      wish: false,
      cart: false,
    },
    {
      id: 3,
      name: "Elegant Red dress",
      group: "dress",
      category: "clothes",
      type: "women",
      price: 50000,
      image: RedDress,
      description:
        "Best red dress suited for going outdoors activities and parties",
      rating: 4.0,
      wish: false,
      cart: false,
    },
    {
      id: 4,
      name: "Golden God dress",
      group: "dress",
      category: "clothes",
      type: "women",
      price: 75000,
      image: GoldDress,
      description:
        "Best dress and will make you become recognizable easily in a crowd",
      rating: 5.0,
      wish: false,
      cart: false,
    },
    {
      id: 5,
      name: "Joyful Green dress",
      group: "dress",
      category: "clothes",
      type: "women",
      price: 45000,
      image: GreenDress,
      description: "Great for going to office and shopping",
      rating: 4.0,
      wish: false,
      cart: false,
    },
  ]);
  useEffect(() => console.log(selected), [selected]);
  const handleToggleCart = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, cart: !item.cart } : item
      )
    );

    setCart((prevCart) => {
      const updatedItems = items.map((item) =>
        item.id === itemId ? { ...item, cart: !item.cart } : item
      );

      return updatedItems.filter((i) => i.cart);
    });
  };
  const kyatToDollar = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        price: parseFloat(item.price / 5000),
      }))
    );
    setCart((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        price: parseFloat(item.price / 5000),
      }))
    );
    setCurrencyType("dollar");
  };
  const dollarToKyat = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        price: parseFloat(item.price * 5000),
      }))
    );
    setCart((prevCarts) =>
      prevCarts.map((item) => ({
        ...item,
        price: parseFloat(item.price * 5000),
      }))
    );
    setCurrencyType("kyats");
  };
  const toggleIcon = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    const total = cart.reduce((total, item) => total + item.price, 0);
    setCartTotal(total);
  }, [cart, currencyType]);

  const contextValue = {
    setTheme,
    selected,
    setSelected,
    items,
    setItems,
    dollarToKyat,
    kyatToDollar,
    toggleIcon,
    currencyType,
    setCurrencyType,
    theme,
    cart,
    setCart,
    handleToggleCart,
    cartTotal,
    cartCount,
    setCartCount,
  };

  return (
    <Context.Provider value={contextValue}>
      <div
        className={
          theme === "dark"
            ? "min-vh-100 bg-dark text-white"
            : "min-vh-100 bg-white text-dark"
        }
        data-bs-theme={theme === "dark" ? "dark" : "light"}
      >
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/cart" element={<Cart />}>
              <Route path=":tag" element={<Cloth />} />
            </Route>

            <Route path="/clothes" element={<Clothes />}>
              <Route path="women" element={<Women />}>
                <Route path=":tag" element={<Cloth />} />
              </Route>
              <Route path="men" element={<Men />}>
                <Route path=":tag" element={<Cloth />} />
              </Route>
              <Route path="child" element={<Child />}>
                <Route path=":tag" element={<Cloth />} />
              </Route>
            </Route>
            <Route path="*" element={<h1> 404 Error Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
};

export default App;
