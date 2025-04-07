import React, { useContext } from "react";
import Context from "./Context";
import { BsCartX } from "react-icons/bs";
import { FaCartArrowDown, FaArrowUp, FaArrowDown } from "react-icons/fa";
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
  const navigate = useNavigate();
  const removeAudio = () => {
    document.getElementById("removeCart").play();
  };
  return (
    <div className="mb-5">
      <button
        className="btn btn-danger"
        onClick={() => {
          setCart([]);
          removeAudio();
        }}
      >
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
              <p>Amount: {item.amount}</p>
              <p>
                Available stock:{" "}
                {item.stock - item.amount > 0
                  ? item.stock - item.amount
                  : "Run out of stocks"}
              </p>
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
              {item.amount >= item.stock ? (
                <></>
              ) : (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setCart((prevCart) =>
                      prevCart.map((c) =>
                        c.id === item.id
                          ? { ...c, amount: Math.min(c.amount + 1, c.stock) }
                          : c
                      )
                    );
                  }}
                >
                  <FaArrowUp />
                </button>
              )}
              {item.amount > 1 && (
                <button
                  className="btn btn-primary m-2"
                  onClick={() => {
                    setCart((prevCart) =>
                      prevCart.map((c) =>
                        c.id === item.id
                          ? { ...c, amount: Math.max(c.amount - 1, 1) }
                          : c
                      )
                    );
                  }}
                >
                  <FaArrowDown />
                </button>
              )}
              <button
                className="btn btn-primary m-2"
                onClick={() => {
                  setSelected(true);
                  navigate(`/clothes/men/${item.id}`);
                }}
              >
                View
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
