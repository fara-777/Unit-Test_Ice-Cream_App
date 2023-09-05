import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../card";

export default function Scoops() {
  const [scoopData, setScoopData] = useState([]);
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/scoops")
      .then((res) => setScoopData(res.data));
  }, []);

  return (
    <>
      <div className="container">
        <h1>Ice Cream Flavors</h1>
        <h4>Price per scoop: $5</h4>
        <h2>Total Price for Flavors: {basket.length * 5}$</h2>
        <div className="row gap-5 p-3 justify-content-between">
          {scoopData.map((scoop, i) => (
            <Card key={i} scoop={scoop} basket={basket} setBasket={setBasket} />
          ))}
        </div>
      </div>
    </>
  );
}
