import { ICard, CreateCardT, IResponse, UpdateCardT } from "../types"
import { apiSlice} from "./api.slice"
const CARDS_URL = "card"

const cardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query<IResponse<ICard>, void>({
      query: () => ({
        url: `/${CARDS_URL}` 
      }),
    }),
    getCard: builder.query<IResponse<ICard>, string>({
      query: (id) => ({
        url: `/${CARDS_URL}/${id}`
      }),
    }),
    createCard: builder.mutation<IResponse<CreateCardT>, CreateCardT>({
      query: (data) => ({
        url: `/${CARDS_URL}`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["List", "BoardLogs"],
    }),
    updateCard: builder.mutation<IResponse<ICard>, { id:string, data:UpdateCardT}>({
      query: ({id, data}) => ({
        url: `/${CARDS_URL}/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["List", "CardLogs", "BoardLogs"],
    }),
    moveCard: builder.mutation<IResponse<string>, {id:string, data: { newListTitle: string }}>({
      query: ({id, data}) => ({
        url: `/${CARDS_URL}/move/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["List", "BoardLogs"],
    }),
    deleteCard: builder.mutation<IResponse<[]>, string>({
      query: (id) => ({
        url: `/${CARDS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["List", "BoardLogs"],
    }),
  })
})

export const { 
  useGetCardsQuery,
  useGetCardQuery,
  useCreateCardMutation,
  useUpdateCardMutation,
  useMoveCardMutation,
  useDeleteCardMutation,
} = cardsApiSlice