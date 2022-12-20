import { render } from "@testing-library/react";
import React from "react";
import Card from "../componets/Card";

export const Home = ({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(10)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onClickFavorite={(obj) => onAddToFavorite(obj)}
        onClickPlus={(obj) => onAddToCart(obj)}
        added={cartItems.some((obj) => Number(obj.id) === Number(item.id))}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
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

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};
