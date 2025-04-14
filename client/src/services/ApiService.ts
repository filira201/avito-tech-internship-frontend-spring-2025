import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BoardsDataType,
  CreateTaskType,
  TasksBoardDataType,
  TasksIssuesDataType,
  UsersDataType,
} from "../models/models";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
  }),
  tagTypes: ["Boards", "Tasks", "Users"],
  endpoints: (builder) => ({
    fetchBoards: builder.query<BoardsDataType, void>({
      query: () => ({
        url: "/boards",
      }),
      providesTags: ["Boards"],
    }),

    fetchTasks: builder.query<TasksIssuesDataType, void>({
      query: () => ({
        url: "/tasks",
      }),
      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation<CreateTaskType, CreateTaskType>({
      query: (task) => ({
        url: "/tasks/create",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    fetchTasksByBoardId: builder.query<TasksBoardDataType, number>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
      }),
      providesTags: ["Tasks"],
    }),

    fetchUsers: builder.query<UsersDataType, void>({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useFetchBoardsQuery,
  useFetchTasksQuery,
  useFetchTasksByBoardIdQuery,
  useFetchUsersQuery,
  useCreateTaskMutation,
} = api;
