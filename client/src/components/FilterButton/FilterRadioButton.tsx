import { FC } from "react";
import styles from "./filterRadioButton.module.css";
import classNames from "classnames";
import { FilterType } from "../../types/types";

interface FilterRadioButtonProps<T extends FilterType> {
  filterId: T["id"];
  filterLabel: T["label"];
  currentStatus: T["id"];
  filterParams: string;
  handleStatusChange: (filterId: T["id"]) => void;
}

const FilterRadioButton: FC<FilterRadioButtonProps<FilterType>> = ({
  filterId,
  filterLabel,
  currentStatus,
  filterParams,
  handleStatusChange,
}) => {
  const isSelected = currentStatus === filterId;

  return (
    <label
      className={classNames(styles.filterButton, {
        [styles.filterButtonSelected]: isSelected,
        [styles.filterButtonDefault]: !isSelected,
      })}
    >
      <input
        type="radio"
        name={filterParams}
        value={filterId}
        checked={isSelected}
        onChange={() => handleStatusChange(filterId)}
        className={styles.srOnly}
      />
      {filterLabel}
    </label>
  );
};

export default FilterRadioButton;
