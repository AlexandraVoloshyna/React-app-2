import { ShowMore } from "../common/show-more"

interface Props  {
  name: string,
  handleDelete: () => void
  handleEdit: () => void 
}

export const CardHeading = ({ name, handleEdit, handleDelete}: Props) => {
  
  return (
    <div className="flex justify-between">
      <div className="text-md">
        {name.length > 22 ? `${name.slice(0, 22)}...` : name}
      </div>
      <ShowMore handleEditing={handleEdit} handleDeleting={handleDelete} />
    </div>
  );
}
