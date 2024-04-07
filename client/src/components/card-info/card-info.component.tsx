interface Props {
  name:string,
  description: string,
  status: string,
  dueDate: string,
  priority: string
}
export const CardInfo = ({name, description, status, dueDate, priority}: Props) => {
  return (
    <div className="flex flex-col flex-grow flex-shrink basis-2/3 gap-2">
      <div className="text-lg">{name}</div>
      <div className="flex justify-between">
        <span className="font-bold text-md">Status</span>
        <span className="text-md capitalize">{status}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-md">DueDate</span> 
        <span className="text-md">{dueDate}</span>
      </div>
      <div className="flex justify-between">
        <span className="font-bold text-md">Priority</span> 
        <span className="text-md capitalize">{priority}</span>
      </div>
      <div className="flex flex-col">
        <div className="font-bold text-4xl">Description</div>
        <p className="text-xl">{description}</p>
      </div>
    </div>
  )
}
