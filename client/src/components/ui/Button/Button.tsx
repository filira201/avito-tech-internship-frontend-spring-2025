import { FC, ReactNode } from "react";
import { ButtonSize, ButtonType, ButtonVariant } from "../../../types/types";
import classNames from "classnames";
import styles from "./button.module.css";

interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  type = "button",
  size = "medium",
  variant = "primary",
  disabled = false,
  children,
  onClick,
}) => {
  const buttonClasses = classNames(
    styles.button,
    styles[size],
    styles[variant]
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
