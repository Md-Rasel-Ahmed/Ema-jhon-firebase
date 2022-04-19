import {
  faArrowCircleRight,
  faSeedling,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import auth from "../../firebase-init";
import ChangeTitle from "../ChangeTitle/ChangeTitle";
import { getStoredCart, removeItem } from "../HandleLocalStorage/localStorage";

const ReviewOrder = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useAuthState(auth);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
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
  //   delte items
  const deleteItem = (cartid) => {
    // removeItem(cartid);
    let storedCart = getStoredCart();
    if (cartid in storedCart) {
      delete storedCart[cartid];
      localStorage.setItem("cart", JSON.stringify(storedCart));
      setProducts([...products]);
    }
  };
  // Check email verification for checkout
  const chekcEmailVerification = () => {
    if (user?.emailVerified === false) {
      toast("Please verify your email");
    }
  };
  return (
    <div>
      <ChangeTitle title="Review Order" />
      <div className="container">
        <div className="row mt-5">
          {cart.map((product) => {
            return (
              <div
                style={{ marginTop: "-57px" }}
                key={product.id}
                className="col-12"
              >
                <div
                  className="  card mb-3 mt-5 mx-auto"
                  style={{ maxWidth: "500px", maxHeight: "300px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                    }}
                    className="row g-0"
                  >
                    <div className="col-md-4">
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                        src={product.img}
                      />
                    </div>
                    <div className="col-md-8 d-flex align-items-center">
                      <div className="card-body">
                        <p className="card-title m-0">{product.name}</p>
                        <strong className="card-text">
                          Price :${product.price}
                        </strong>
                        <p className="m-0">Shiping : {product.shipping}</p>
                        <p>Quantity : {product.quantity}</p>
                      </div>
                      <button
                        onClick={() => deleteItem(product.id)}
                        className="me-2 bg-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="text-center pb-5">
            <Link
              onClick={chekcEmailVerification}
              className="bg-success text-light p-2"
              to="/chekout"
            >
              Chekout <FontAwesomeIcon icon={faArrowCircleRight} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewOrder;
