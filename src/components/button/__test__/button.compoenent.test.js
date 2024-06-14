import { render, screen } from "@testing-library/react";

import Button, { BUTTON_TYPE_CLASSES } from "./../button.component";

describe("button test", () => {
  test("should render base button when nothing is passed", () => {
    render(<Button />);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: black");
  });

  test("should render googleButton when google type passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);
    const googleButton = screen.getByRole("button");
    expect(googleButton).toHaveStyle("background-color: #4285f4");
  });

  test("should render inverted button when inverted is passed", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);
    const invertedButton = screen.getByRole("button");
    expect(invertedButton).toHaveStyle("background-color: white");
  });

  test("should be disabled when loading is true", () => {
    render(<Button isLoading={true} />);
    const disbaledButton = screen.getByRole("button");
    expect(disbaledButton).toBeDisabled();
  });
});
