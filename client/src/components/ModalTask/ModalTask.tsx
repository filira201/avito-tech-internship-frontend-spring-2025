import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./modalTask.module.css";
import { closeModal } from "../../store/reducers/modalSlice";
import { MouseEvent } from "react";
import ModalTaskContent from "../ModalTaskContent/ModalTaskContent";

const ModalTask = () => {
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  if (!isOpen) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const inModal = target.closest("[data-id=modal]");
    if (inModal) return;

    handleClose();
  };

  return (
    <div onClick={handleClick} className={styles.overlay}>
      <div data-id="modal" className={styles.modalWrapper}>
        <ModalTaskContent handleClose={handleClose} />
      </div>
    </div>
  );
};

export default ModalTask;
