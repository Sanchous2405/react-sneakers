import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Drawer } from "./componets/Drawer";
import { Header } from "./componets/Header";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";

const AppContext = React.createContext({});

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorite, setFavorite] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch("https://6383c51b1ada9475c807492b.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://6383c51b1ada9475c807492b.mockapi.io/cart"
      );

      const favoriteResponse = await axios.get(
        "https://6383c51b1ada9475c807492b.mockapi.io/favorite"
      );
      const itemsResponse = await axios.get(
        "https://6383c51b1ada9475c807492b.mockapi.io/items"
      );
      setIsLoading(false);
      setCartItems(cartResponse.data);
      setFavorite(favoriteResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://6383c51b1ada9475c807492b.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      axios.post("https://6383c51b1ada9475c807492b.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };
  const onRemoveToCart = (id) => {
    axios.delete(`https://6383c51b1ada9475c807492b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorite.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://6383c51b1ada9475c807492b.mockapi.io/favorite/${obj.id}`
        );
        // setFavorite((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://6383c51b1ada9475c807492b.mockapi.io/favorite",
          obj
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить товар");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorite }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveToCart}
          />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/favorites"
            exact
            element={
              <Favorites items={favorite} onAddToFavorite={onAddToFavorite} />
            }
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
