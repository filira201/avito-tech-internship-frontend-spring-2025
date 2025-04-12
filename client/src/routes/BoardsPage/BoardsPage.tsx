import List from "../../components/List/List";
import Project from "../../components/Project/Project";
import { BoardType } from "../../models/models";
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
  if (!projects.length) {
    return <h2 className={styles.notFountTitle}>У вас пока нет проектов</h2>;
  }

  return (
    <div>
      <h1 className={styles.titleH1}>Проекты</h1>

      <div className={styles.wrapper}>
        <List
          items={projects}
          renderItem={(project: BoardType) => (
            <Project key={project.id} project={project} />
          )}
        />
      </div>
    </div>
  );
};

export default BoardsPage;
