import classNames from "classnames";
import { FC } from "react";
import styles from "./priorityBar.module.css";
import { PriorityType } from "../../models/models";

interface PriorityBarProps {
  priority: PriorityType;
}

const PriorityBar: FC<PriorityBarProps> = ({ priority }) => {
  const barClasses = classNames(
    styles.priorityBar,
    styles[priority.toLowerCase()]
  );

  return <div className={barClasses} />;
};

export default PriorityBar;
