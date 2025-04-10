import { FC } from "react";
import { IBoard } from "../../models/models";
import styles from "./projectsList.module.css";
import Project from "../Project/Project";

interface ProjectsListProps {
  projects: IBoard[];
}

const ProjectsList: FC<ProjectsListProps> = ({ projects }) => {
  return (
    <section className={styles.grid}>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </section>
  );
};

export default ProjectsList;
