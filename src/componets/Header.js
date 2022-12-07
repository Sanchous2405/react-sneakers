import React from "react";

export const Header = ({ onClickCart }) => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center ">
        <img width={40} height={40} src="/image/logo.svg" alt="" />
        <div>
          <h3 className="text-uppercase">React Sneaker</h3>
          <p className="opacity-5"> Магазин лучших кроссовок</p>
        </div>
      </div>

      <ul className="d-flex ">
        <li onClick={onClickCart} className="mr-20 cu-p">
          <img width={18} height={18} src="/image/korzina.svg" alt="Korzina" />{" "}
          <span> 1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} src="/image/Union.svg" alt="" />
        </li>
      </ul>
    </header>
  );
};
