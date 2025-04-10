import ProjectsList from "../../components/ProjectsList/ProjectsList";
import { useFetchBoardsQuery } from "../../services/ApiService";
import styles from "./boardPage.module.css";

const BoardsPage = () => {
  const { data, isLoading, isFetching, error } = useFetchBoardsQuery();

  if (isLoading || isFetching) return <h1>Loading</h1>;
  if (error) {
    console.log(error);
    // return <h1>Error loading boards</h1>;
  }

  const projects = data?.data || [];

  return (
    <div>
      <h1 className={styles.titleH1}>Проекты</h1>
      {projects.length === 0 ? (
        <h2 className={styles.notFountTitle}>У вас пока нет проектов</h2>
      ) : (
        <div className={styles.wrapper}>
          <ProjectsList projects={projects} />
        </div>
      )}
    </div>
  );
};

export default BoardsPage;
