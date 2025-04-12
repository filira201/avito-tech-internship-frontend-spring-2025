import { FC } from "react";
import styles from "./paginationArrow.module.css";
import classNames from "classnames";

interface PaginationArrowProps {
  onClick: () => void;
  disabled?: boolean;
  direction: "right" | "left";
}

const PaginationArrow: FC<PaginationArrowProps> = ({
  onClick,
  disabled,
  direction,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(styles.arrowButton, {
        [styles.right]: direction === "right",
        [styles.left]: direction === "left",
      })}
    >
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.svgArrow}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={styles.svgArrow}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      )}
    </button>
  );
};

export default PaginationArrow;
