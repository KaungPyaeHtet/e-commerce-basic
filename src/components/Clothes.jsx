import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Context from "./Context";
import { FaCartArrowDown, FaCartPlus, FaStar } from "react-icons/fa";

const Clothes = () => {
  const navigate = useNavigate();
  const { setSelected, selected, items, currencyType, cart, handleToggleCart } =
    useContext(Context);
  useEffect(() => console.log(cart), [cart]);
  const isExactClothesRoute = location.pathname === "/clothes";

  return (
    <>
      <Outlet />
      {isExactClothesRoute && (
        <div className="w-50 mx-auto text-center p-5">
          <h3 className="text-center"> Clothes </h3>
          <div className="container border rounded p-4 m-3">
            <div>
              {items.map((item) => {
                if (item.category === "clothes") {
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

                      <img
                        src={item.image}
                        className="w-50 h-50 border rounded-circle opacity-75"
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
                      <br />
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setSelected(true);
                          navigate(`/clothes/men/${item.id}`);
                        }}
                      >
                        View{" "}
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Clothes;
