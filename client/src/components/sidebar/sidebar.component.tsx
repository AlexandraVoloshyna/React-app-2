import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeSidebar } from "../../redux/sidebar.slice";
import { useGetLogsForBoardQuery } from "../../redux/activity-api.slice";
import { ILog } from "../../types";
import { cn, formatDate } from "../../utils";
interface Props  {
  boardId: string
}
export const Sidebar = ({boardId}:Props) => {
  const dispatch = useAppDispatch()
  const isOpen = useAppSelector((state)=> state.sidebar.isOpen)
  const {data: logs, error:err, isLoading} = useGetLogsForBoardQuery(boardId)
  if (isLoading) return <div>Loading...</div>
  if (err)  "status" in err ? console.error(err.data) : console.error(err.message)

  const handleSidebarClose = () => {
    dispatch(closeSidebar())
  }
  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 top-0 w-80 border-l border-solid border-gray-300 bg-gray-100 shadow-md transition-transform duration-300 ease-in-out translate-x-0",
        isOpen ? "translate-x-0" : "translate-x-80",
      )}
    >
      <div className="min-h-12 bg-blue-600 text-white p-4 text-left text-lg">
        <button type="button"  className="capitalize" onClick={handleSidebarClose}>
          close
        </button>
      </div>
      <div className="pt-3 px-2">
        <ul className="flex flex-col gap-2">
          {logs?.data.map((log: ILog) => (
            <li key={log.id} className="text-md border-b-2 border-solid border-gray-400">
              You {log.actionType.toLowerCase()} {log.entityType} <span className="font-bold">"{log.entityName}"</span> on {formatDate(log.createdAt)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};