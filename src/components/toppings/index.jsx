import axios from "axios";
import { useEffect, useState } from "react";

export default function Toppings() {
  const [toppingsData, setToppingsData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/toppings")
      .then((res) => setToppingsData(res.data));
  }, []);

  const handleChange = (e, topping) => {
    e.target.checked
      ? setBasket([...basket, topping])
      : setBasket(basket.filter((item) => item.name !== topping.name));
  };

  return (
    <>
      <div className="container my-5">
        <h1>Sauces</h1>
        <h4>Price per piece: $2</h4>
        <h2>Total Price for sauces: {basket.length * 2}$</h2>
        <div className="row gap-3 mt-3">
          {toppingsData.map((topping, i) => (
            <div
              key={i}
              className="d-flex flex-column align-items-center gap-2"
              style={{ width: "150px" }}
            >
              <img
                className="img-fluid"
                src={topping.imagePath}
                alt={topping.name}
              />
              <label htmlFor={topping.name} className="text-nowrap">
                {topping.name}
              </label>
              <input
                onChange={(e) => handleChange(e, topping)}
                className="form-check-input"
                type="checkbox"
                id={topping.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
