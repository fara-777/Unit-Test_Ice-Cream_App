import { useState } from "react";

export default function Form() {
  const [isChecked, setIsChecked] = useState(false);
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <div className="my-4 d-flex align-items-center justify-content-center gap-3">
        <input
          onChange={(e) => setIsChecked(e.target.checked)}
          id="terms"
          className="form-check-input "
          type="checkbox"
        />
        <div className="terms">
          <p
            style={{ visibility: isHover ? "visible" : "hidden" }}
            className="bg-light rounded shadow p-2"
          >
            Size gercekten bir sey teslim etmeyecegiz.
          </p>
          <label htmlFor="terms" className="lead">
            Kosullari okudum ve kabul ediyorum.
          </label>
        </div>
        <button
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          disabled={!isChecked}
          className="btn btn-warning"
        >
          {" "}
          Siparisi onayla
        </button>
      </div>
    </>
  );
}
