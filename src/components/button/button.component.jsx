import { BaseButton, GoogleSignInButton, Inverted,LoadingSpinner } from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: Inverted,
  }[buttonType]);

const Button = ({ children, isLoading,buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton disabled={isLoading} {...otherProps}>{isLoading ? <LoadingSpinner /> : children}</CustomButton>;
};

export default Button;
