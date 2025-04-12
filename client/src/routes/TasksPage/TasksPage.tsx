import { useMemo } from "react";
import FiltersContent from "../../components/FiltersContent/FiltersContent";
import List from "../../components/List/List";
import Search from "../../components/Search/Search";
import Button from "../../components/ui/Button/Button";
import TaskCard from "../../components/ui/TaskCard/TaskCard";
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

const TasksPage = () => {
  const { data, isLoading, isFetching, error } = useFetchTasksQuery();
  const [searchParams] = useSearchParams();

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

  if (isLoading || isFetching) return <h1>Loading</h1>;
  if (error) {
    console.log(error);
    // return <h1>Error loading boards</h1>;
  }
  const tasks = data?.data || [];
  if (!tasks.length) {
    return <h2 className={styles.notFountTitle}>У вас пока нет задач</h2>;
  }

  console.log("render");

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
                task={task}
                onClick={() => {
                  console.log(task.id);
                }}
              />
            )}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button>Создать задачу</Button>
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
