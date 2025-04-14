import { useMemo } from "react";
import FiltersContent from "../../components/FiltersContent/FiltersContent";
import List from "../../components/List/List";
import Search from "../../components/Search/Search";
import Button from "../../components/ui/Button/Button";
import {
  calculateFilterTasksByBoardName,
  calculateFilterTasksBySearchQuery,
  calculateFilterTasksByStatus,
  calculatePaginateTasks,
  getUniqueItems,
} from "../../lib/utils";
import { TaskIssuesType } from "../../models/models";
import { useFetchTasksQuery } from "../../services/ApiService";
import styles from "./taskPages.module.css";
import { BoarsNamesOption, StatusOption } from "../../types/types";
import { useSearchParams } from "react-router";
import { ITEMS_PER_PAGE } from "../../lib/constants";
import Pagination from "../../components/Pagination/Pagination";
import TaskCard from "../../components/TaskCard/TaskCard";
import { useAppDispatch } from "../../hooks/redux";
import { openModal } from "../../store/reducers/modalSlice";
import Loader from "../../components/Loader/Loader";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

const TasksPage = () => {
  const { data, isLoading, isFetching, error } = useFetchTasksQuery();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const uniqueTasksBoardNameObject: BoarsNamesOption[] = useMemo(() => {
    if (!data?.data) return [];

    const boardsNames = data.data.map((task) => task.boardName);
    const uniqueTasksBoardName = getUniqueItems(boardsNames);

    const objUniqueTasksBoardName = uniqueTasksBoardName.map((boardName) => ({
      id: boardName,
      label: boardName,
    }));

    return [{ id: "all", label: "Все" }, ...objUniqueTasksBoardName];
  }, [data?.data]);

  const { page, totalPages, paginatedTasks } = useMemo(() => {
    if (!data?.data) return { page: 1, totalPages: 0, paginatedTasks: [] };

    const searchQuery = searchParams.get("query") || "";
    const status = (searchParams.get("status") || "all") as StatusOption["id"];
    const boardName = (searchParams.get("board") ||
      "all") as BoarsNamesOption["id"];
    const page = Number(searchParams.get("page")) || 1;

    const filteredTasksByStatus = calculateFilterTasksByStatus(
      status,
      data.data
    );
    const filteredTasksByBoardName = calculateFilterTasksByBoardName(
      boardName,
      filteredTasksByStatus
    );
    const filterTasksBySearchQuery = calculateFilterTasksBySearchQuery(
      searchQuery,
      filteredTasksByBoardName
    );
    const totalPages = Math.ceil(
      filterTasksBySearchQuery.length / ITEMS_PER_PAGE
    );
    const paginatedTasks = calculatePaginateTasks(
      page,
      filterTasksBySearchQuery
    );

    return { page, totalPages, paginatedTasks };
  }, [searchParams, data?.data]);

  if (isLoading || isFetching) return <Loader />;
  if (error) {
    return <ErrorPage error={error} />;
  }
  const tasks = data?.data || [];
  if (!tasks.length) {
    return <h1 className={styles.notFountTitle}>У вас пока нет задач</h1>;
  }

  return (
    <div>
      <h1 className={styles.titleH1}>Задачи</h1>

      <div className={styles.wrapper}>
        <div>
          <Search />
          <div className={styles.filterContainer}>
            <FiltersContent
              uniqueTasksBoardNameObject={uniqueTasksBoardNameObject}
            />
          </div>
        </div>
        <div className={styles.container}>
          <List
            items={paginatedTasks}
            renderItem={(task: TaskIssuesType) => (
              <TaskCard
                key={task.id}
                showDetails={true}
                task={task}
                onClick={() => {
                  dispatch(
                    openModal({
                      isCreate: false,
                      context: {
                        fromTasks: true,
                        taskId: task.id,
                        boardId: task.boardId,
                      },
                    })
                  );
                }}
              />
            )}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={() => dispatch(openModal({ isCreate: true }))}>
            Создать задачу
          </Button>
        </div>
        {!paginatedTasks.length ? (
          <h2 className={styles.notFountTitle}>Задач не найдено</h2>
        ) : (
          <div className={styles.paginationWrapper}>
            <Pagination totalPages={totalPages} currentPage={page} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
