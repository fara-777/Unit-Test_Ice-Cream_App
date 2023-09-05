import { render, screen } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

/* 
! Selectors
? Commands [All] BySelector
* Command > get | find | query
* get => used when elements are initially present in the DOM
* find => used when it's uncertain when an element will appear on the screen (async)
* query => used when elements are not initially present in the DOM and will appear conditionally

* Note: The find method is async, so it should be used with async/await.
*/

test("A card is rendered for each flavor coming from the API", async () => {
  render(<Scoops />);
  // Checking all cards (images) that are rendered on the screen
  const images = await screen.findAllByRole("img", { name: "flavor" });
});

describe("Checking flavor addition and resetting in Ice Cream Flavors", () => {
  test("Addition of a flavor reflects in the total price", async () => {
    render(<Scoops />);

    const user = userEvent.setup();

    // Checking the total price
    const total = screen.getByRole("heading", {
      name: /Total Price for Flavors:/i,
    });

    // Checking the add buttons
    const buttons = await screen.findAllByRole("button", { name: "Add" });

    // Flavor and price check
    await user.click(buttons[0]);
    expect(total).toHaveTextContent(5);

    // Double-clicking (vanilla) flavor check
    await user.dblClick(buttons[1]);
    expect(total).toHaveTextContent(15);
  });
});

test("Resetting a flavor reflects in the total price", async () => {
  render(<Scoops />);

  const user = userEvent.setup();

  // Required elements
  const total = screen.getByRole("heading", {
    name: /Total Price for Flavors:/i,
  });

  const resetButtons = await screen.findAllByRole("button", { name: "Reset" });
  const addButtons = await screen.findAllByRole("button", { name: "Add" });

  // Flavor addition check

  await user.click(addButtons[2]);
  await user.dblClick(addButtons[3]);
  expect(total).toHaveTextContent(15);

  // Resetting a flavor that is in the basket once check
  await user.click(resetButtons[2]);
  expect(total).toHaveTextContent(10);

  // Resetting a flavor that is in the basket twice check
  await user.dblClick(resetButtons[3]);
  expect(total).toHaveTextContent(0);
});
