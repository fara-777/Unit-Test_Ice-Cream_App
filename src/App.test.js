import userEvent from "@testing-library/user-event";
import App from "./App";
import { render, screen } from "@testing-library/react";

test("Addition of a flavor reflects in the total price", async () => {
  render(<App />);

  const user = userEvent.setup();
  // Retrieving the total heading
  const total = screen.getByRole("heading", {
    name: /Total Price for Flavors:/i,
  });
  // Checking the add buttons
  const addButtons = await screen.findAllByRole("button", { name: "Add" });
  await user.click(addButtons[3]);

  const scoopAmounts = await screen.findAllByTestId("scoop-amount");
  //Calculate the total amount
  const totalAmount = scoopAmounts.reduce((total, item) => {
    return total + parseInt(item.textContent, 10);
  }, 0);
  // Checking the total
  expect(totalAmount).toBe(1);
});

test("Checking the impact of adding and removing sauces on the total price", async () => {
  render(<App />);

  const user = userEvent.setup();
  // Retrieving the total heading
  const total = screen.getByRole("heading", {
    name: /Total Price for sauces:/i,
  });

  const gummiChek = await screen.findByRole("checkbox", {
    name: /Gummi bears/i,
  });
  // Adding sauce to the basket
  await user.click(gummiChek);
  // Checking the total
  expect(total).toHaveTextContent(2);

  const peanutChek = await screen.findByRole("checkbox", {
    name: /Peanut butter cups/i,
  });
  // penaut chekbox tikleme kontrolu
  await user.click(peanutChek);
  // fiyat kontrolu
  expect(total).toHaveTextContent(4);
});
