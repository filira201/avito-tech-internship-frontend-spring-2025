import { useSearchParams } from "react-router";
import FilterRadioButton from "../FilterButton/FilterRadioButton";
import styles from "./filter.module.css";
import { FilterType } from "../../types/types";
import { FC, ReactNode } from "react";

interface FilterProps<T extends FilterType> {
  children: ReactNode;
  filterParams: string;
  items: T[];
}

const Filter: FC<FilterProps<FilterType>> = ({
  children,
  filterParams,
  items,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = (searchParams.get(filterParams) ||
    "all") as FilterType["id"];

  const handleStatusChange = (statusId: FilterType["id"]) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (statusId === "all") {
      params.delete(filterParams);
    } else {
      params.set(filterParams, statusId);
    }
    setSearchParams(params);
  };

  return (
    <div>
      <p className={styles.paragraph}>{children}</p>
      <div className={styles.filterContainer}>
        {items.map((item) => (
          <FilterRadioButton
            key={item.id}
            filterId={item.id}
            filterLabel={item.label}
            currentStatus={currentStatus}
            filterParams={filterParams}
            handleStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default Filter;
