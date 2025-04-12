import { FC } from "react";
import Filter from "../Filter/Filter";
import styles from "./filtersContainer.module.css";
import { BoarsNamesOption } from "../../types/types";
import { statusOptions } from "../../lib/constants";

interface FilterContainerProps {
  uniqueTasksBoardNameObject: BoarsNamesOption[];
}

const FilterContainer: FC<FilterContainerProps> = ({
  uniqueTasksBoardNameObject,
}) => {
  return (
    <div className={styles.container}>
      <Filter filterParams="status" items={statusOptions}>
        Фильтр по статусу
      </Filter>
      <Filter filterParams="board" items={uniqueTasksBoardNameObject}>
        Фильтр по доске
      </Filter>
    </div>
  );
};

export default FilterContainer;
