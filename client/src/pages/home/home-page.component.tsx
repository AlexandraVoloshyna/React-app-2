import { Board } from "../../components/board"
import { useGetBoardsQuery } from "../../redux/board-api.slice"
import { IBoard } from "../../types"


export const HomePage = () => {
  const { data: boards, error:err, isLoading} = useGetBoardsQuery()
  if (isLoading) return <div>Loading...</div>
  if (err)  "status" in err ? console.error(err.data) : console.error(err.message)
  return (
    <div className="max-w-[1200px] px-4 mx-auto">
      {boards?.data.map((board: IBoard)=> (
        <Board
          key={board.id}
          id={board.id}
          title={board.title}
        />
      ))}
    </div>
  )
}
