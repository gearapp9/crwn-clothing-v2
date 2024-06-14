import { screen } from "@testing-library/react";
import Navigation from "../navigation.component";
import { renderWithProviders } from "../../../utils/test.util";

describe("navigation tests", () => {
  test("should render singin if there is no currentuser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: null,
        },
      },
    });

    const singinComponent = screen.getByText(/Sign-in/i);
    expect(singinComponent).toBeInTheDocument();
  });

  test("should render sing out if there is a currentUser", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {},
        },
      },
    });

    const singoutLink = screen.getByText(/Sign out/i);
    expect(singoutLink).toBeInTheDocument();
  });

  test("should not render cart dropdown if cartIsVisible is false", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          cartItems: [],
          cartIsVisible: false,
        },
      },
    });
    const dropdownTextElement = screen.queryByText("Your Cart Is Empty");
    expect(dropdownTextElement).toBeNull();
  });

  test("should render cart dopdonw if  cartIsVisible is true", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          cartItems: [],
          cartIsVisible: true,
        },
      },
    });

    const dropdownTextElement = screen.getByText("Your Cart Is Empty");
    expect(dropdownTextElement).toBeInTheDocument();
  });
});
