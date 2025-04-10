import { FC } from "react";
import { IBoard } from "../../models/models";
import { Link } from "react-router";
import styles from "./project.module.css";

interface ProjectProps {
  project: IBoard;
}

const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{project.name}</h2>
      <div className={styles.textWrapper}>
        <p className={styles.paragraph}>{project.description}</p>
        <p className={styles.paragraph}>
          Задач в проекте:{" "}
          <span className={styles.span}>{project.taskCount}</span>
        </p>
      </div>
      <Link to={`/board/${project.id}`} className={styles.link}>
        Перейти к доске
      </Link>
    </article>
  );
};

export default Project;
