export default function Card({ scoop, basket, setBasket }) {
  // Finding the quantity of the product in the basket
  const found = basket.filter((item) => item.name === scoop.name);

  const amount = found.length;

  const handleReset = () => {
    const clear = basket.filter((item) => item.name !== scoop.name);
    setBasket(clear);
  };

  return (
    <>
      <div
        className="d-flex flex-column align-items-center gap-3"
        style={{ width: "160px" }}
      >
        <img className="img-fluid" src={scoop.imagePath} alt={"flavor"} />
        <label className="lead">{scoop.name}</label>
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-danger" onClick={handleReset}>
            Reset
          </button>
          <span className="lead" data-testid="scoop-amount">
            {amount}
          </span>
          <button
            className="btn btn-warning"
            onClick={() => setBasket([...basket, scoop])}
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
}
