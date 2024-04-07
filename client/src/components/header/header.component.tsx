import { useLocation, useParams } from "react-router-dom";
import { Button } from "../common/button"
import { useCreateListMutation } from "../../redux/lists-api.slice"
import { useCreateBoardMutation } from "../../redux/board-api.slice";
import { useAppDispatch} from "../../redux/hooks"
import { openSidebar } from "../../redux/sidebar.slice"
export const Header = () => {
  const { id } = useParams();
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [createList] = useCreateListMutation()
  const [createBoard] = useCreateBoardMutation()
  const handleCreateList = async () => {
    try {
      await createList({
        title: "new list",
        boardId: id as string
      }).unwrap()
    } catch (error) {
      console.error(error)
    }
  } 
  const handleCreateBoard = async () => {
    try {
      await createBoard({
        title: "new board",
      }).unwrap()
    } catch (error) {
      console.error(error)
    }
  }
  const handleSidebarOpen = () => {
    dispatch(openSidebar())
  }
  return (
    <header className="border-b border-gray-500">
      <div className="mx-auto flex min-h-20 max-w-[1200px] items-center justify-between px-4 xs:flex-col">
        <h1 className="text-lg font-bold leading-lg ">Task Board</h1>
        <div className="flex flex-wrap gap-sm xs:justify-end">
          {location.pathname !== "/" 
            ? 
            <Button type="button" className="font-bold text-lg border-none" onClick={handleSidebarOpen}>
              History
            </Button> 
            : 
            null
          }
          {location.pathname === "/" 
            ? 
            <Button type="button" className="text-lg rounded-lg font-bold border-none" onClick={handleCreateBoard}>
              +
            </Button>
            :
            <Button type="button" className="text-lg rounded-lg font-bold border-none" onClick={handleCreateList}>
              +
            </Button>
          }
        </div>
      </div>
    </header>
  );
}

