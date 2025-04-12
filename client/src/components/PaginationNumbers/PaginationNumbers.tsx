import { FC } from "react";
import styles from "./paginationNumbers.module.css";
import classNames from "classnames";

interface PaginationNumbersProps {
  allPages: number[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const PaginationNumbers: FC<PaginationNumbersProps> = ({
  allPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className={styles.container}>
      {allPages.map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={classNames(styles.button, {
            [styles.active]: currentPage === page,
          })}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationNumbers;
