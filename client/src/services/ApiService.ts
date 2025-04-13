import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BoardsDataType,
  TasksBoardDataType,
  TasksIssuesDataType,
} from "../models/models";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
  tagTypes: ["Boards", "Tasks"],
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

    fetchTasksByBoardId: builder.query<TasksBoardDataType, number>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
      }),
      providesTags: ["Tasks"],
    }),
  }),
});

export const {
  useFetchBoardsQuery,
  useFetchTasksQuery,
  useFetchTasksByBoardIdQuery,
} = api;
