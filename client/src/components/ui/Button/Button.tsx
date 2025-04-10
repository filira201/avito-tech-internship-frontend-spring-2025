import { FC, ReactNode } from "react";
import { ButtonSize, ButtonVariant } from "../../../types/button";
import classNames from "classnames";
import styles from "./button.module.css";

interface ButtonProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
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
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
