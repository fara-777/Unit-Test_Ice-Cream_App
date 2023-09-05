import { getByRole, render, screen, waitFor } from "@testing-library/react";
import Form from "../form/index";
import userEvent from "@testing-library/user-event";

test("kosullarin onaylanmasina gore buton aktifligi", async () => {
  render(<Form />);

  const user = userEvent.setup();
  // gerekli elemani alma

  const orderBtn = screen.getByRole("button");
  const checkBox = screen.getByRole("checkbox", {
    name: "Kosullari okudum ve kabul ediyorum.",
  });

  // buton inaktif olma durumu
  expect(orderBtn).toBeDisabled();
  // chekbox'un tiksiz oldugunu kontrol etme
  expect(checkBox).not.toBeChecked();
  // checkbox tiklanma ve aktiflik kontrolu
  await user.click(checkBox);
  expect(orderBtn).toBeEnabled();
  // checkbox'tan tiki kaldirma ve buton aktiflik kontrolu
  await user.click(checkBox);
  expect(orderBtn).toBeDisabled();
});

test("onayla butonu hover olunca bildirim cikar", async () => {
  render(<Form />);

  const user = userEvent.setup();

  // gerekli elemanlar
  const checkBox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");

  // kullanici etkilesimlerini tetikleme
  await user.click(checkBox);
  await user.hover(button);

  // bildirim cagirma
  await waitFor(() => {
    const popup = screen.getByText("Size gercekten", { exact: false });
    // bildirim gozukuyorumu kontrolu
    expect(popup).toBeVisible();
  });
  // mouse unhover
  await user.unhover(button);

  await waitFor(() => {
    const popup = screen.getByText("Size gercekten", { exact: false });
    // bildirim gozukuyorumu kontrolu
    expect(popup).toBeVisible();
  });
});
