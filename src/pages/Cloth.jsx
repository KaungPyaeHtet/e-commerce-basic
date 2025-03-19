import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Context from "../components/Context";
import {
  FaArrowLeft,
  FaStar,
  FaShoppingCart,
  FaCartArrowDown,
  FaCartPlus,
} from "react-icons/fa";

const Cloth = () => {
  let { tag } = useParams();
  const navigate = useNavigate();
  const { setSelected, items, handleToggleCart } = useContext(Context);
  const item = items.find((item) => item.id === parseInt(tag));
  if (!item) {
    return <h1> 404 not found </h1>;
  }
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate(-1);
          setSelected(false);
        }}
      >
        <FaArrowLeft />
      </button>
      <div className="container border ">
        <div className="item-details">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div>Price: {item.price}</div>
          <div>
            Rating: {item.rating}{" "}
            {[...Array(item.rating)].map((_, i) => (
              <FaStar key={i} color={item.rating === 5 ? "gold" : "orange"} />
            ))}
          </div>
          <img
            src={item.image}
            style={{maxHeight : "400px", maxWidth : "400px"}}
            className="h-25 border border-info border-4 rounded-circle opacity-75"
          />

          <br />
          {item.cart ? (
            <button
              className="btn btn-success m-3"
              onClick={() => handleToggleCart(item.id)}
            >
              <FaCartArrowDown />
            </button>
          ) : (
            <button
              className="btn btn-primary m-3"
              onClick={() => handleToggleCart(item.id)}
            >
              <FaCartPlus />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Cloth;
