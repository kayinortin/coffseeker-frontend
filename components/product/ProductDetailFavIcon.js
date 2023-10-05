import { useState, useEffect } from 'react';

import { useFavorite } from '../../context/fav';

function ProductDetailFavIcon(props) {
  const { id } = props;
  const { favItemsArr, setFavItemsArr } = useFavorite();
  const [fav, setFav] = useState(false);

  const handleSetFav = () => {
    setFav(!fav);
    const favArr = [...favItemsArr, id];
    if (fav === false) {
      //未收藏 -> 收藏
      if (favItemsArr.includes(id)) {
        return;
      }
      setFavItemsArr(favArr);
      localStorage.setItem('fav', favArr);
    } else {
      //收藏 -> 取消收藏
      const remainFavArr = favArr.filter((item) => item !== id);
      setFavItemsArr([...remainFavArr]);
      localStorage.setItem('fav', remainFavArr);
    }
  };

  const isActive = favItemsArr.findIndex((item) => item === id) !== -1;

  return (
    <>
      <button
        className={`ed-fav-btn ed-fav-btn--large ed-fav-btn--icon ${
          isActive && 'active'
        } `}
        type="button"
        onClick={handleSetFav}
      >
        <i className="fas fa-heart ed-fav-btn__icon"></i>
      </button>
    </>
  );
}

export default ProductDetailFavIcon;