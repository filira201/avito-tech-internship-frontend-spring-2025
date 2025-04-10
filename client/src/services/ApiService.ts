import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBoardData } from "../models/models";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
  tagTypes: ["Boards", "Teams", "Tasks", "Users"],
  endpoints: (builder) => ({
    fetchBoards: builder.query<IBoardData, void>({
      query: () => ({
        url: "/boards",
      }),
      providesTags: ["Boards"],
    }),
  }),
});

export const { useFetchBoardsQuery } = api;
