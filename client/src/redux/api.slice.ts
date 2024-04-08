import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const BASE_URL = "https://trello-server-wpjf.onrender.com/api"
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
    credentials: "include",    
  }),
  tagTypes: ["Lists", "List", "Options", "BoardLogs", "CardLogs", "Boards"],
  endpoints: () => ({}),
});