import { CreateBoardT, IBoard, IResponse, UpdateBoardT, } from "../types";
import { apiSlice} from "./api.slice"
const BOARDS_URL = "board"

const boardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<IResponse<IBoard[]>, void>({
      query: () => ({
        url: `/${BOARDS_URL}` 
      }),
      providesTags: ["Boards"],
    }),
    createBoard: builder.mutation<IResponse<IBoard>, CreateBoardT>({
      query: (data) => ({
        url: `/${BOARDS_URL}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Boards"],
    }),
    updateBoard: builder.mutation<IResponse<IBoard>, {id: string, data:UpdateBoardT}>({
      query: ({id, data}) => ({
        url: `/${BOARDS_URL}/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["Boards"],
    }),
    deleteBoard: builder.mutation<IResponse<[]>, string>({
      query: (id) => ({
        url: `/${BOARDS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boards"],
    }),
  })
})

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation
} = boardsApiSlice