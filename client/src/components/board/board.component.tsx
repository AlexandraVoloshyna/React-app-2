import { Link } from "react-router-dom"
import { BoardHeading } from "../board-heading"
import { useDeleteBoardMutation } from "../../redux/board-api.slice"
interface Props {
  id: string,
  title: string
}
export const Board = ({id, title}: Props) => {
  const [deleteBoard] = useDeleteBoardMutation()
  const handleDelete = async (id:string) => {
    try {
      await deleteBoard(id).unwrap()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <BoardHeading name={title} id={id} handleDelete={() => handleDelete(id)} />
      <Link to={`/board/${id}`}>Open the board</Link>
    </div>
  )
}
