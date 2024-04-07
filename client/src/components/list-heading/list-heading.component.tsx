import { Input } from "../common/input"
import { ShowMore } from "../common/show-more"
import { useUpdateListMutation } from "../../redux/lists-api.slice"
import { useState } from "react"

interface Props  {
  name: string,
  handleDelete: () => void,
  id: string
}

export const ListHeading = ({ name, handleDelete, id}: Props) => {
  const [title, setTitle] = useState<string>(name)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [updateList] = useUpdateListMutation()
 
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      if (e.key === "Enter") {
        await updateList({id, data:{
          title,
        }})
        setIsEditing(false);
      }
    } catch (error) {
      console.error(error)
    }

  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setTitle(e.target.value)
  }
  const handleEdit = () =>{
    setIsEditing(true)
  }
  
  return (
    <>
      {isEditing ? (
        <Input
          type="text"
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Enter Title"
        />
      ) : (
        <div className="flex justify-between">
          <div className="capitalize text-md">{title.length > 20 ? `${title.slice(0, 20)}...` : title}</div>
          <ShowMore handleEditing={handleEdit} handleDeleting={handleDelete}/>
        </div>
      )}
    </>
  )
}