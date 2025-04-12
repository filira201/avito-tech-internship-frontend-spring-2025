import { LinkType, StatusOption, statusTranslation } from "../types/types";

export const links: LinkType[] = [
  { name: "Все задачи", href: "/issues" },
  { name: "Проекты", href: "/boards" },
];

export const statusOptions: StatusOption[] = [
  { id: "all", label: "Все" },
  { id: "Backlog", label: statusTranslation.Backlog },
  { id: "InProgress", label: statusTranslation.InProgress },
  { id: "Done", label: statusTranslation.Done },
];

export const ITEMS_PER_PAGE: number = 6;
