import { FC } from "react";
import Assignee from "../../Assignee/Assignee";
import PriorityBar from "../../PriorityBar/PriorityBar";
import { TaskBoardType, TaskIssuesType } from "../../../models/models";
import BoardLabel from "../../BoardLabel/BoardLabel";
import TaskStatus from "../../TaskStatus/TaskStatus";
import styles from "./taskCard.module.css";

interface TaskCardProps {
  task: TaskIssuesType | TaskBoardType;
  onClick: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Открыть редактор задачи"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <PriorityBar priority={task.priority} />

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h2 className={styles.title}>{task.title}</h2>
            <TaskStatus status={task.status} />
          </div>
          <p className={styles.description}>{task.description}</p>
        </div>

        <div>
          <div className={styles.labelsWrapper}>
            {"boardName" in task && <BoardLabel>{task.boardName}</BoardLabel>}
            <BoardLabel>Приоритет: {task.priority}</BoardLabel>
          </div>
          <div className={styles.assigneeWrapper}>
            <Assignee assignee={task.assignee} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
