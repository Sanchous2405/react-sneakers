import React, { useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";

const Card = ({
  id,
  title,
  price,
  imageUrl,
  onClickPlus,
  onClickFavorite,
  favorited = false,
  added = false,
  loading = false,
}) => {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const handleClick = () => {
    onClickPlus({ id, title, price, imageUrl });
    setIsAdded(!isAdded);
  };

  const onClickHeart = () => {
    onClickFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={450}
          height={255}
          viewBox="0 0 450 255"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="165" />
          <rect x="0" y="181" rx="5" ry="5" width="151" height="15" />
          <rect x="0" y="204" rx="5" ry="5" width="151" height="15" />
          <rect x="1" y="254" rx="3" ry="3" width="80" height="24" />
          <rect x="118" y="254" rx="4" ry="4" width="30" height="24" />
        </ContentLoader>
      ) : (
        <>
          {" "}
          <div className={styles.favorite} onClick={onClickHeart}>
            <img
              src={
                isFavorite
                  ? "/image/heart-like.svg"
                  : "/image/heart-unliked.svg"
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
        </>
      )}
    </div>
  );
};

export default Card;
