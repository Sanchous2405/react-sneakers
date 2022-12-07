import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./componets/Card";
import { Drawer } from "./componets/Drawer";
import { Header } from "./componets/Header";

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // fetch("https://6383c51b1ada9475c807492b.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });
    axios
      .get("https://6383c51b1ada9475c807492b.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://6383c51b1ada9475c807492b.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://6383c51b1ada9475c807492b.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveToCart = (id) => {
    axios.delete(`https://6383c51b1ada9475c807492b.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item=> item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveToCart}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40  ">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue ? `Идет поиск по: ${searchValue} ` : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            {searchValue && (
              <img
                className="clear cu-p"
                onClick={() => setSearchValue("")}
                src="/image/kres.svg"
                alt=""
              />
            )}
            <img src="/image/search.svg" alt="Search" />
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items
            .filter((item) => item.title.toLowerCase().includes(searchValue))
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onClickFavorite={() => console.log("добавли в закладки")}
                onClickPlus={(obj) => onAddToCart(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
