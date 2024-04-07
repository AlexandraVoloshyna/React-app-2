import { useGetLogsForCardQuery } from "../../redux/activity-api.slice"
import { ILog } from "../../types"
import { formatDate } from "../../utils"
interface Props {
  id:string
} 
export const CardActivity = ({id}: Props) => {
  const {data: logs, isLoading, error:err} = useGetLogsForCardQuery(id)
  if (isLoading) return <div>Loading...</div>
  if (err)  "status" in err ? console.error(err.data) : console.error(err.message)
  return (
    <div className="flex-grow flex-shrink basis-1/3">
      <h5 className="text-lg font-bold">Card Activity</h5>
      <ul className="pt-3 flex flex-col gap-2">
        { logs?.data.map((log:ILog)=> (
          <li key={log.id} className="text-md">This card was {log.actionType.toLowerCase()} on {formatDate(log.createdAt)}</li>
        ))}
      </ul>
    </div>
  )
}
