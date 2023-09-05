import { render, screen } from "@testing-library/react";
import Toppings from ".";
import userEvent from "@testing-library/user-event";

test("Checking the impact of adding and removing sauces on the total price", async () => {
  render(<Toppings />);
  const user = userEvent.setup();

  // Retrieving the total heading
  const total = screen.getByRole("heading", {
    name: /Total Price for sauces:/i,
  });

  // Adding sauce to the basket
  const cherryCheck = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  await user.click(cherryCheck);

  // Checking the total
  expect(total).toHaveTextContent("2");

  // Adding another sauce to the basket
  const mochiCheck = await screen.findByRole("checkbox", {
    name: /mochi/i,
  });
  await user.click(mochiCheck);

  // Checking the total
  expect(total).toHaveTextContent("4");

  // Removing one sauce from the basket
  await user.click(cherryCheck);
  expect(total).toHaveTextContent("2");

  // Removing another sauce from the basket
  await user.click(mochiCheck);
  expect(total).toHaveTextContent("0");
});
