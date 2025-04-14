import { useParams } from "react-router";
import { useFetchTasksByBoardIdQuery } from "../../services/ApiService";
import styles from "./BoardPage.module.css";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useAppDispatch } from "../../hooks/redux";
import { openModal } from "../../store/reducers/modalSlice";
import Loader from "../../components/Loader/Loader";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

const BoardPage = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, error } = useFetchTasksByBoardIdQuery(
    Number(id)
  );
  const dispatch = useAppDispatch();

  if (isLoading || isFetching) return <Loader />;
  if (error) {
    return <ErrorPage error={error} />;
  }

  const tasks = data?.data || [];
  if (!tasks.length) {
    return (
      <h1 className={styles.notFountTitle}>
        У вас пока нет задач на этой доске
      </h1>
    );
  }

  const tasksByStatus = {
    backlog: tasks.filter((task) => task.status === "Backlog"),
    inProgress: tasks.filter((task) => task.status === "InProgress"),
    done: tasks.filter((task) => task.status === "Done"),
  };

  const statusColumns = [
    { id: "backlog", title: "Выполнить", tasks: tasksByStatus.backlog },
    { id: "inProgress", title: "В работе", tasks: tasksByStatus.inProgress },
    { id: "done", title: "Готово", tasks: tasksByStatus.done },
  ];

  return (
    <div>
      <h1 className={styles.titleH1}>Доска задач</h1>
      <div className={styles.boardContainer}>
        <div className={styles.columnsContainer}>
          {statusColumns.map((column) => (
            <div key={column.id} className={styles.column}>
              <div className={styles.columnHeader}>
                <p className={styles.columnTitle}>{column.title}</p>
                <span className={styles.taskCount}>{column.tasks.length}</span>
              </div>

              <div className={styles.tasksList}>
                {!column.tasks.length ? (
                  <div className={styles.emptyColumn}>
                    Нет задач в этом статусе
                  </div>
                ) : (
                  column.tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      showDetails={false}
                      onClick={() => {
                        dispatch(
                          openModal({
                            isCreate: false,
                            context: {
                              fromBoard: true,
                              taskId: task.id,
                              boardId: Number(id),
                            },
                          })
                        );
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
