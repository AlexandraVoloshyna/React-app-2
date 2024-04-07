import { Button } from "../button"
import deleteIcon from "../../../assets/delete.svg"
import editIcon from "../../../assets/edit.svg"
interface Props{
    handleEdit: ()=>void
    deleteAction: () => void
    setIsOpen: (v:boolean)=> void
}

export const Dropdown = ({ setIsOpen, handleEdit, deleteAction}:Props) => {
  const handleUpdate = ()=> {
    handleEdit()
    setIsOpen(false)
  }
  const handleDelete = () => {
    deleteAction()
    setIsOpen(false)
  }
  return (
    <ol className=" absolute right-0 z-[2] flex min-w-min flex-col gap-sm rounded-md border border-black bg-white p-2">
      <li className="flex">
        <img src={deleteIcon} alt="delete icon" />
        <Button
          type="button"
          className="w-full border-0 px-2.5 py-1.5 font-bold hover:bg-white hover:text-black hover:shadow-md"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </li>
      <li className="flex">
        <img src={editIcon} alt="edit icon" />
        <Button
          type="button"
          className="w-full border-0 px-2.5 py-1.5 font-bold hover:bg-white hover:text-black hover:shadow-md"
          onClick={handleUpdate}
        >
          Edit
        </Button>
      </li>
    </ol>
  );
}
