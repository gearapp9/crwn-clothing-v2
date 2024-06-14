import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test.util";
import CartIcon from "../cart-icon.component";

describe("Cart icon test", () => {
  test("Uses preloaded state to render", () => {
    const initialCartItems = [
      { id: 1, nale: "item a", imageUrl: "test", price: 10, quantity: 1 },
      { id: 2, nale: "item 2", imageUrl: "test", price: 10, quantity: 2 },
    ];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });

    const cartIconElement = screen.getByText("3");
    expect(cartIconElement).toBeInTheDocument;
  });
});
