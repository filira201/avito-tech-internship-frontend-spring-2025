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

export type TaskBoardType = Omit<TaskGeneralType, "boardId" | "boardName">;

export type TasksBoardDataType = {
  data: TaskBoardType[];
};

export type CreateTaskType = {
  assigneeId: AssigneeType["id"];
  boardId: BoardType["id"];
  description: TaskGeneralType["description"];
  priority: TaskGeneralType["priority"];
  title: TaskGeneralType["title"];
};

type UsersType = AssigneeType & {
  description: string;
  tasksCount: number;
  teamId: number;
  teamName: string;
};

export type UsersDataType = {
  data: UsersType[];
};

export type ModalStateContext = {
  fromBoard?: boolean;
  fromTasks?: boolean;
  boardId?: number;
  taskId?: number;
};

export type ModalState = {
  isOpen: boolean;
  isCreate: boolean;
  context: ModalStateContext;
};

export type ApiError = {
  status: number;
  data: {
    error: string;
    message: string;
  };
};
