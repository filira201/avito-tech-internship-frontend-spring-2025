import ErrorPage from "../../components/ErrorPage/ErrorPage";
import List from "../../components/List/List";
import Loader from "../../components/Loader/Loader";
import Project from "../../components/Project/Project";
import { BoardType } from "../../models/models";
import { useFetchBoardsQuery } from "../../services/ApiService";
import styles from "./boardPage.module.css";

const BoardsPage = () => {
  const { data, isLoading, isFetching, error } = useFetchBoardsQuery();

  if (isLoading || isFetching) return <Loader />;
  if (error) {
    return <ErrorPage error={error} />;
  }

  const projects = data?.data || [];
  if (!projects.length) {
    return <h1 className={styles.notFountTitle}>У вас пока нет проектов</h1>;
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
