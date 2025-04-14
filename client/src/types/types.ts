import { BoardType, StatusType } from "../models/models";

export type LinkType = {
  name: string;
  href: string;
};

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonType = "button" | "submit";

export type RussianStatusType = "Выполнить" | "В работе" | "Готово";
export const statusTranslation: Record<StatusType, RussianStatusType> = {
  Backlog: "Выполнить",
  InProgress: "В работе",
  Done: "Готово",
};

export type FilterType = { id: string; label: string };

export type StatusOption = {
  id: StatusType | "all";
  label: RussianStatusType | "Все";
};

export type BoarsNamesOption = {
  id: BoardType["name"] | "all";
  label: BoardType["name"] | "Все";
};
