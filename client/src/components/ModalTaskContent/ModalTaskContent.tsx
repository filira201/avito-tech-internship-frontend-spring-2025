import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import Button from "../ui/Button/Button";
import styles from "./modalTaskContent.module.css";
import FromTask from "../FormTask/FormTask";

interface ModalTaskContentProps {
  handleClose: () => void;
}

const ModalTaskContent: FC<ModalTaskContentProps> = ({ handleClose }) => {
  const { isCreate, context } = useAppSelector((state) => state.modal);

  return (
    <div className={styles.modalContentWrapper}>
      <div className={styles.modalContent}>
        <FromTask
          isCreate={isCreate}
          fromBoard={context.fromBoard}
          fromTasks={context.fromTasks}
          boardId={context.boardId}
          taskId={context.taskId}
        />
      </div>
      <div className={styles.closeButtonWrapper}>
        <Button variant="danger" onClick={handleClose}>
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export default ModalTaskContent;
