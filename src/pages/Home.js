import React from "react";
import Card from "../componets/Card";

export const Home = ({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
}) => {
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

      <div className="d-flex flex-wrap">
        {items
          .filter((item) => item.title.toLowerCase().includes(searchValue))
          .map((item, index) => (
            <Card
              key={index}
              onClickFavorite={(obj) => onAddToFavorite(obj)}
              onClickPlus={(obj) => onAddToCart(obj)}
              {...item}
            />
          ))}
      </div>
    </div>
  );
};
