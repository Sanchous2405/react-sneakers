import React, { useState } from "react";
import styles from "./Card.module.scss";

const Card = ({ title, price, imageUrl, onClickPlus, onClickFavorite }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    onClickPlus({ title, price, imageUrl });
    setIsAdded(!isAdded);
  };

  const onClickHeart = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickHeart}>
        <img
          src={
            isFavorite ? "/image/heart-like.svg" : "/image/heart-unliked.svg"
          }
          alt="sneakers"
        />
      </div>

      <img width={133} height={122} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column  ">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>

        <img
          className={styles.plus}
          onClick={handleClick}
          src={isAdded ? "/image/btn-plus.svg" : "/image/btn.svg"}
          alt=""
        />
      </div>
    </div>
  );
};

export default Card;
