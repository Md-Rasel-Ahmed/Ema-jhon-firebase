import React, { useEffect, useState } from "react";
import {
  getStoredCart,
  HandleLocalStorage,
} from "../HandleLocalStorage/localStorage";
import OrderSammary from "../Order-samary/OrderSammary";
import Product from "../Product/Product";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

import "./shop.css";
import toast from "react-hot-toast";
import ChangeTitle from "../ChangeTitle/ChangeTitle";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  let [show, setShow] = useState(false);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let storedCart = getStoredCart();
    let savedCart = [];
    for (const id in storedCart) {
      let findAddedProduct = products.find((product) => product.id === id);
      if (findAddedProduct) {
        let quantity = storedCart[id];
        findAddedProduct.quantity = quantity;
        savedCart.push(findAddedProduct);
      }
    }
    // console.log(savedCart);
    setCart(savedCart);
  }, [products]);
  const addToCart = (addProducts) => {
    toast.success("Product added", {
      style: {
        backgroundColor: "green",
        color: "#fff",
      },
    });
    let newCart = [];
    let exists = cart.find((product) => product.id === addProducts.id);
    if (!exists) {
      addProducts.quantity = 1;
      newCart = [...cart, addProducts];
    } else {
      let rest = cart.filter((product) => product.id !== addProducts.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    // console.log(product);
    setCart(newCart);
    HandleLocalStorage(addProducts.id);
  };
  const showBtn = () => {
    if (show) {
      setShow(false);
    }
    if (!show) {
      setShow(true);
    }
  };
  const override = css`
    display: block;
    position: absolute;
    bottom: 50%;
    left: 50%;
    right: 50%;
    top: 50%;
    border-color: black;
  `;

  return (
    <>
      <ChangeTitle title="Home" />
      {loading ? (
        <RingLoader
          className="text-primary"
          loading={loading}
          css={override}
          size={70}
        />
      ) : (
        <>
          <div className="showBtn">
            <button className="showBtn" onClick={showBtn}>
              {show ? "Hide Cart" : "Show Cart"}
            </button>
          </div>
          <div className="wraper">
            <div className="product-container">
              {products.map((product) => (
                <Product
                  key={product.id}
                  addToCart={addToCart}
                  product={product}
                ></Product>
              ))}
            </div>
            <div className="order-sammary">
              {show ? (
                <OrderSammary
                  setProducts={setProducts}
                  products={products}
                  cart={cart}
                ></OrderSammary>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Shop;
