import React, { useState } from "react";
import "./orderSammary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ChangeTitle from "../ChangeTitle/ChangeTitle";

const OrderSammary = (props) => {
  //   const [total, setTotal] = useState(0);
  const { cart } = props;
  let total = 0;
  let quantity = 0;
  for (const product of cart) {
    quantity = quantity + product.quantity;
    total = total + product.price * product.quantity;
  }

  let shipings = 0;
  let taxt = (total / 100) * 10;
  let grandTotal = total + shipings + taxt;
  // remove all cart items from local storage
  const clearCart = () => {
    console.log("ok");
    localStorage.removeItem("cart");
    props.setProducts([...props.products]);
  };
  return (
    <div style={{ paddingLeft: "5px" }}>
      <ChangeTitle title="Order Sammary" />
      <h1>Order samary</h1>
      <h4>Selected Items : {quantity}</h4>
      <h4>Total Price : ${total}</h4>
      <h4>Total Shipping Charge : ${total > 1000 ? "20" : shipings}</h4>
      <h4>Tax : ${taxt.toFixed(0)}</h4>
      <h4>Grand Total : ${grandTotal.toFixed(0)}</h4>
      <div className="orderBtn">
        <button onClick={clearCart}>
          Clear Cart <FontAwesomeIcon icon={faTrash} />{" "}
        </button>
        <button>
          <Link style={{ color: "#fff" }} to="/revieworder">
            Review Order
            <FontAwesomeIcon
              style={{ marginLeft: "5px" }}
              icon={faArrowAltCircleRight}
            />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default OrderSammary;
