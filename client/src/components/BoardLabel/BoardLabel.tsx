import { FC, ReactNode } from "react";
import styles from "./boardLabel.module.css";

interface BoardLabelProps {
  children: ReactNode;
}

const BoardLabel: FC<BoardLabelProps> = ({ children }) => {
  return <span className={styles.board}>{children}</span>;
};

export default BoardLabel;
