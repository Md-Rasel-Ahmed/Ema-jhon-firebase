const HandleLocalStorage = (id) => {
  let shoppingCart = getStoredCart();

  // add quantity
  let quantity = shoppingCart[id];
  if (!quantity) {
    shoppingCart[id] = 1;
  } else {
    let newQuantity = quantity + 1;
    shoppingCart[id] = newQuantity;
  }
  localStorage.setItem("cart", JSON.stringify(shoppingCart));
};
const getStoredCart = () => {
  let shoppingCart = {};
  //   get the shoppingCart from local storage
  let storedCart = localStorage.getItem("cart");
  if (storedCart) {
    shoppingCart = JSON.parse(storedCart);
  }
  return shoppingCart;
};
const removeItem = (id) => {
  let storedCart = localStorage.getItem("cart");
  if (storedCart) {
  }
  return storedCart;
};
export { HandleLocalStorage, getStoredCart, removeItem };
