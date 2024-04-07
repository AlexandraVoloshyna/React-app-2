import {  ILog, IResponse,  } from "../types"
import { apiSlice} from "./api.slice"
const LOGS_URL = "logging"

const logsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogsForBoard: builder.query<IResponse<ILog[]>, string>({
      query: (id) => ({
        url: `/${LOGS_URL}/board/${id}` 
      }),
      providesTags: ["BoardLogs"]
    }),
    getLogsForCard: builder.query<IResponse<ILog[]>, string>({
      query: (id) => ({
        url: `/${LOGS_URL}/card/${id}`
      }),
      providesTags: ["CardLogs"]
    }),
  })
})

export const { 
  useGetLogsForBoardQuery,
  useGetLogsForCardQuery,
} = logsApiSlice