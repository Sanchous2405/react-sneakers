import React from "react";

export const Drawer = ({ onClose, onRemove, items = [] }) => {
  return (
    <div className="overlay ">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between ">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/image/kres.svg"
            alt=""
          />
        </h2>

        {items.length > 0 ? (
          <div>
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center ">
                  <div
                    style={{
                      backgroundImage: `url(${obj.imageUrl})`,
                    }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price}руб</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/image/kres.svg"
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>21 568 руб</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб</b>
                </li>
              </ul>
              <button className="greenButton">
                Оформить заказ <img src="/image/strela.svg" alt="" />
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column align-center empty ">
            <img className="mt-50" src="/image/empty.svg" alt="" />
            Корзина Пуста
            <button className="greenButton mt-30" onClick={onClose}>
              {" "}
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
