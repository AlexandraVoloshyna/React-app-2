export interface IResponse<T>  {
    data: T 
    message: string
}
export interface ICard {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    description: string,
    dueDate: Date,
    priority: "low" | "medium" | "high",
}
export type CreateCardT = Omit<ICard, "id" | "createdAt" | "dueDate"| "updatedAt"> & { listId: string };
export type UpdateCardT = Partial<Omit<ICard, "id" | "createdAt" | "updatedAt">>;
export  interface IList {
    id: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    cards: ICard[] | []
    board: IBoard
}
export type CreateListT = Omit<IList, "id" | "createdAt" | "updatedAt" | "cards" | "board"> & { boardId: string };
export type UpdateListT = Omit<IList,  "createdAt" | "updatedAt" | "cards"| "id" | "board">;

export interface IOption {
    label: string,
    value: string
}
export interface ILog {
    id: string,
    entityName: string,
    entityType: string,
    actionType: string,
    entityId: string,
    boardId: string,
    createdAt: Date,
    updatedAt: Date,
}
export interface IBoard{
    id: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
    lists: IList[] | []
}
export type CreateBoardT = Omit<IBoard, "id" | "createdAt" | "updatedAt" | "lists">;
export type UpdateBoardT = Omit<IBoard,  "createdAt" | "updatedAt" | "lists"| "id">;
