import { CreateListT, IList, IOption, IResponse, UpdateListT } from "../types";
import { apiSlice} from "./api.slice"
const LISTS_URL = "list"

const listsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLists: builder.query<IResponse<IList[]>, void>({
      query: () => ({
        url: `/${LISTS_URL}` 
      }),
      providesTags: ["Lists"],
    }),
    getOptions: builder.query<IResponse<IOption[]>, void>({
      query: () => ({
        url: `/${LISTS_URL}/options` 
      }),
      providesTags: ["Options"],
    }),
    getListsByBoardId: builder.query<IResponse<IList[]>, string>({
      query: (id) => ({
        url: `/${LISTS_URL}/${id}` 
      }),
      providesTags: ["List"],
    }),
    createList: builder.mutation<IResponse<IList>, CreateListT>({
      query: (data) => ({
        url: `/${LISTS_URL}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["List", "Options", "BoardLogs"],
    }),
    updateList: builder.mutation<IResponse<IList>, {id: string, data:UpdateListT}>({
      query: ({id, data}) => ({
        url: `/${LISTS_URL}/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["List", "Options", "BoardLogs"],
    }),
    deleteList: builder.mutation<IResponse<[]>, string>({
      query: (id) => ({
        url: `/${LISTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["List", "BoardLogs"],
    }),
  })
})

export const {
  useGetListsQuery,
  useGetOptionsQuery,
  useGetListsByBoardIdQuery,
  useCreateListMutation,
  useUpdateListMutation,
  useDeleteListMutation
} = listsApiSlice