import { FC } from "react";
import styles from "./assignee.module.css";
import { AssigneeType } from "../../models/models";

interface AssigneeProps {
  assignee: AssigneeType;
}

const Assignee: FC<AssigneeProps> = ({ assignee }) => {
  return (
    <div className={styles.assignee}>
      <img
        src={assignee.avatarUrl}
        alt={assignee.fullName}
        className={styles.avatar}
        loading="lazy"
      />
      <div className={styles.info}>
        <span className={styles.name}>{assignee.fullName}</span>
        <span className={styles.email}>{assignee.email}</span>
      </div>
    </div>
  );
};

export default Assignee;
