import React from "react";
import "./product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowAltCircleRight,
  faShoppingCart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Product = ({ product, addToCart }) => {
  const { img, name, price, ratings } = product;
  //   console.log(props);
  return (
    <div>
      <div className="card">
        <div className="card-img">
          <img src={img} alt="" />
        </div>
        <div className="card-title">
          <h4>{name.slice(0, 25)}</h4>
          <p>
            Price :<strong>${price}</strong>
          </p>
          <p>Rating :{ratings}</p>
        </div>
        <div className="card-footerr">
          <button onClick={() => addToCart(product)}>
            <p>Add To Cart</p>
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
