import { ApiError, StatusType, TaskIssuesType } from "../models/models";
import {
  BoarsNamesOption,
  RussianStatusType,
  StatusOption,
  statusTranslation,
} from "../types/types";
import { ITEMS_PER_PAGE } from "./constants";

export const translateStatus = (status: StatusType): RussianStatusType => {
  return statusTranslation[status];
};

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "data" in error
  );
}

export function getUniqueItems<T>(items: T[]): T[] {
  const uniqueItems = new Set<T>();

  for (const item of items) {
    if (!uniqueItems.has(item)) {
      uniqueItems.add(item);
    }
  }

  return Array.from(uniqueItems);
}

export const calculateFilterTasksByStatus = (
  status: StatusOption["id"],
  tasks: TaskIssuesType[]
): TaskIssuesType[] => {
  if (status === "all") return tasks;

  return tasks.filter((task) => task.status === status);
};

export const calculateFilterTasksByBoardName = (
  boardName: BoarsNamesOption["id"],
  tasks: TaskIssuesType[]
): TaskIssuesType[] => {
  if (boardName === "all") return tasks;

  return tasks.filter((task) => task.boardName === boardName);
};

export const calculateFilterTasksBySearchQuery = (
  searchQuery: string,
  tasks: TaskIssuesType[]
): TaskIssuesType[] => {
  if (searchQuery === "") return tasks;

  return tasks.filter((task) => {
    const searchQueryLowerCase = searchQuery.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchQueryLowerCase) ||
      task.assignee.fullName.toLowerCase().includes(searchQueryLowerCase)
    );
  });
};

export const calculatePaginateTasks = (
  page: number,
  tasks: TaskIssuesType[]
): TaskIssuesType[] => {
  return tasks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
};

export const generatePagination = (
  currentPage: number,
  totalPages: number
): number[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
};
