import { FC, useState } from "react";
import Button from "../ui/Button/Button";
import styles from "./filtersContent.module.css";
import classNames from "classnames";
import FilterContainer from "../FiltersContainer/FiltersContainer";
import { BoarsNamesOption } from "../../types/types";

interface FiltersContentProps {
  uniqueTasksBoardNameObject: BoarsNamesOption[];
}

const FiltersContent: FC<FiltersContentProps> = ({
  uniqueTasksBoardNameObject,
}) => {
  const [filterMenuIsOpen, setFilterMenuIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => setFilterMenuIsOpen(!filterMenuIsOpen)}
      >
        {filterMenuIsOpen ? "Закрыть" : "Открыть"} фильтры
      </Button>
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.filterContainer, {
            [styles.filterContentOpen]: filterMenuIsOpen,
          })}
        >
          <FilterContainer
            uniqueTasksBoardNameObject={uniqueTasksBoardNameObject}
          />
        </div>
      </div>
    </div>
  );
};

export default FiltersContent;
