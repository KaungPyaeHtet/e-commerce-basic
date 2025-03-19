import React, { useContext } from "react";
import Context from "./Context";
import { BsCartX } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    setCart,
    handleToggleCart,
    setSelected,
    cartTotal,
    currencyType,
  } = useContext(Context);
  const navigate = useNavigate()
  return (
    <div>
      <button className="btn btn-danger" onClick={() => setCart([])}>
        <BsCartX /> <span> Remove Everything </span>{" "}
      </button>

      <h1>
        You have to pay {cartTotal} {currencyType}
      </h1>
      <div className="d-flex p-3 border rounded text-center">
        {cart.map((item) => {
          return (
            <div
              key={item.id}
              className="container border border-3 max-vh-50 max-vw-50 m-auto p-3"
            >
              <p>Name: {item.name}</p>
              <p>Price: {item.price}</p>
              <img
                src={item.image}
                className="rounded border border-secondary border-2 rounded-circle"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
              <hr />
              <button
                className="btn btn-danger m-2"
                onClick={() => handleToggleCart(item.id)}
              >
                <FaCartArrowDown />
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelected(true);
                  navigate(`/clothes/men/${item.id}`);
                }}
              >View</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
