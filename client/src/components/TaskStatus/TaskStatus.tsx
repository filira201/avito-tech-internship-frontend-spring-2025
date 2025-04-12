import { FC } from "react";
import { StatusType } from "../../models/models";
import styles from "./taskStatus.module.css";
import { translateStatus } from "../../lib/utils";

interface TaskStatusProps {
  status: StatusType;
}

const TaskStatus: FC<TaskStatusProps> = ({ status }) => {
  const statusText = translateStatus(status).toUpperCase();

  return <span className={styles.status}>{statusText}</span>;
};

export default TaskStatus;
