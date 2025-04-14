import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./formTask.module.css";
import { RussianStatusType } from "../../types/types";
import { ModalStateContext, PriorityType } from "../../models/models";
import {
  useCreateTaskMutation,
  useFetchBoardsQuery,
  useFetchUsersQuery,
} from "../../services/ApiService";
import { taskFormScheme, TaskFormValues } from "../../schemes/schemes";
import { isApiError } from "../../lib/utils";
import Button from "../ui/Button/Button";
import { useAppDispatch } from "../../hooks/redux";
import { closeModal } from "../../store/reducers/modalSlice";
import classNames from "classnames";
import Loader from "../Loader/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";

interface FromTaskProps {
  isCreate: boolean;
  fromBoard: ModalStateContext["fromBoard"];
  fromTasks: ModalStateContext["fromTasks"];
  boardId: ModalStateContext["boardId"];
  taskId: ModalStateContext["taskId"];
  defaultValues?: Partial<TaskFormValues>;
}

const FromTask: FC<FromTaskProps> = ({
  isCreate,
  fromBoard,
  boardId,
  defaultValues,
}) => {
  const dispatch = useAppDispatch();
  const [createTask] = useCreateTaskMutation();
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
    error: errorUsers,
  } = useFetchUsersQuery();
  const {
    data: boardsData,
    isLoading: isLoadingBoards,
    isFetching: isFetchingBoards,
    error: errorBoards,
  } = useFetchBoardsQuery();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormScheme),
    defaultValues: isCreate ? {} : defaultValues || {},
  });

  if (
    isLoadingUsers ||
    isFetchingUsers ||
    isLoadingBoards ||
    isFetchingBoards
  ) {
    return <Loader />;
  }
  if (errorUsers || errorBoards) {
    if (errorBoards) {
      return <ErrorPage error={errorBoards} />;
    }

    return <ErrorPage error={errorUsers} />;
  }
  const users = usersData?.data || [];
  const boards = boardsData?.data || [];

  const priorityOptions: PriorityType[] = ["Low", "Medium", "High"];
  const statusRussianOptions: RussianStatusType[] = [
    "В работе",
    "Выполнить",
    "Готово",
  ];
  const assigneeOptionsMap = new Map(
    users.map((user) => [user.fullName, user.id])
  );
  const boardsOptionsMap = new Map(
    boards.map((board) => [board.name, board.id])
  );
  const boardsIdToNameMap = new Map(
    boards.map((board) => [board.id, board.name])
  );

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onSubmit: SubmitHandler<TaskFormValues> = async (data) => {
    try {
      const boardId = boardsOptionsMap.get(data.project) || 0;
      const assigneeId = assigneeOptionsMap.get(data.assignee) || 0;

      if (isCreate) {
        const apiData = {
          title: data.title,
          description: data.description,
          boardId: boardId,
          assigneeId: assigneeId,
          priority: data.priority,
        };
        await createTask(apiData).unwrap();
        handleClose();
      }
    } catch (error) {
      if (isApiError(error)) {
        setError("root", {
          message: error.data.message,
        });
      } else {
        setError("root", {
          message: "Неизвестная ошибка",
        });
      }
    }
  };

  return (
    <div className={styles.modalContent}>
      <h2 className={styles.modalTitle}>
        {isCreate ? "Создание задачи" : "Редактирование задачи"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.taskForm}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>
            Название задачи *
          </label>
          <input
            id="title"
            type="text"
            className={classNames(styles.formInput, {
              [styles.error]: errors.title,
            })}
            {...register("title")}
          />
          {errors.title && (
            <span className={styles.errorMessage}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.formLabel}>
            Описание задачи *
          </label>
          <textarea
            id="description"
            className={classNames(styles.formTextarea, {
              [styles.error]: errors.description,
            })}
            rows={4}
            {...register("description")}
          />
          {errors.description && (
            <span className={styles.errorMessage}>
              {errors.description.message}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="project" className={styles.formLabel}>
            Проект *
          </label>
          <select
            id="project"
            className={classNames(styles.formSelect, {
              [styles.error]: errors.project,
            })}
            {...register("project")}
            disabled={fromBoard}
            defaultValue={
              fromBoard ? boardsIdToNameMap.get(boardId as number) : ""
            }
          >
            <option value="" disabled hidden>
              Выберите проект
            </option>
            {Array.from(boardsOptionsMap.keys()).map((board) => (
              <option key={board} value={board}>
                {board}
              </option>
            ))}
          </select>
          {errors.project && (
            <span className={styles.errorMessage}>
              {errors.project.message}
            </span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="priority" className={styles.formLabel}>
              Приоритет *
            </label>
            <select
              id="priority"
              className={classNames(styles.formSelect, {
                [styles.error]: errors.priority,
              })}
              {...register("priority")}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Выберите приоритет
              </option>
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.priority && (
              <span className={styles.errorMessage}>
                {errors.priority.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status" className={styles.formLabel}>
              Статус *
            </label>
            <select
              id="status"
              className={classNames(styles.formSelect, {
                [styles.error]: errors.status,
              })}
              {...register("status")}
              disabled={isCreate}
              defaultValue={isCreate ? "Выполнить" : ""}
            >
              <option value="" disabled hidden>
                Выберите статус
              </option>
              {statusRussianOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.status && (
              <span className={styles.errorMessage}>
                {errors.status.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="assignee" className={styles.formLabel}>
            Исполнитель *
          </label>
          <select
            id="assignee"
            className={classNames(styles.formSelect, {
              [styles.error]: errors.assignee,
            })}
            {...register("assignee")}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Выберите исполнителя
            </option>
            {Array.from(assigneeOptionsMap.keys()).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.assignee && (
            <span className={styles.errorMessage}>
              {errors.assignee.message}
            </span>
          )}
        </div>

        <div className={styles.formActions}>
          <Button type="submit">
            {isCreate ? "Создать" : "Обновить"} задачу
          </Button>
        </div>
        {errors.root && (
          <span className={styles.rootErrorMessage}>{errors.root.message}</span>
        )}
      </form>
    </div>
  );
};

export default FromTask;
