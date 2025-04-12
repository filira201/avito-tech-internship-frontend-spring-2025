export type BoardType = {
  description: string;
  id: number;
  name: string;
  taskCount: number;
};

export type BoardsDataType = {
  data: BoardType[];
};

export type PriorityType = "Low" | "Medium" | "High";
export type StatusType = "Backlog" | "InProgress" | "Done";

export type AssigneeType = {
  avatarUrl: string;
  email: string;
  fullName: string;
  id: number;
};

type TaskGeneralType = {
  assignee: AssigneeType;
  boardId: BoardType["id"];
  boardName: BoardType["name"];
  description: string;
  id: number;
  priority: PriorityType;
  status: StatusType;
  title: string;
};

export type TaskIssuesType = TaskGeneralType;

export type TasksIssuesDataType = {
  data: TaskIssuesType[];
};

// Ne ispolzuets9 poka

// type TaskByIdType = Omit<TaskGeneralType, "boardId">;

export type TaskBoardType = Omit<TaskGeneralType, "boardId" | "boardName">;

export type TasksBoardDataType = {
  data: TaskBoardType[];
};
