import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Context from "../../components/Context";
import { FaStar, FaCartPlus, FaCartArrowDown } from "react-icons/fa";

const Women = () => {
  const navigate = useNavigate();
  const { setSelected, selected, items, currencyType, cart, handleToggleCart } =
    useContext(Context);
    const addCart = () => {
      document.getElementById("addCart").play();
    };
  useEffect(() => console.log(cart), [cart]);

  return (
    <>
      {selected ? (
        <Outlet />
      ) : (
        <div className="w-50 mx-auto text-center p-5">
          <h3 className="text-center"> Women Clothes </h3>
          <div className="container border rounded p-4 m-3">
            <div>
              {items
                .filter((item) => item.type === "women")
                .map((item) => {
                  return (
                    <div
                      className="container border rounded p-4 m-3"
                      key={item.id}
                    >
                      <h5>{item.name}</h5>
                      <div>
                        {" "}
                        Rating :{" "}
                        {[...Array(item.rating)].map((_, i) => (
                          <FaStar
                            key={i}
                            color={item.rating === 5 ? "gold" : "orange"}
                          />
                        ))}
                      </div>
                      <div>
                        {" "}
                        {item.price} {currencyType}{" "}
                      </div>
                      <img
                        src={item.image}
                        className="w-50 h-50 border rounded-circle opacity-75"
                      />
                      <br />
                      {item.cart ? (
                        <button
                          className="btn btn-success m-3"
                          onClick={() => {
                            handleToggleCart(item.id);
                            addCart();
                          }}
                        >
                          <FaCartArrowDown />
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary m-3"
                          onClick={() => {
                            handleToggleCart(item.id);
                            addCart();
                          }}
                        >
                          <FaCartPlus />
                        </button>
                      )}
                      <br />
                      <button
                        className="btn btn-primary"
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
        </div>
      )}
    </>
  );
};

export default Women;
