import { MySelect } from "../common/select"
import { useDeleteCardMutation, useUpdateCardMutation } from "../../redux/cards-api.slice"
import { CardHeading } from "../card-heading"
import { Modal } from "../common/modal"
import { useState } from "react"
import { Form } from "../common/form"
import { FormType } from "../../enums"
import editIcon from "../../assets/edit.svg"
import { Button } from "../common/button"
import { formatDate } from "../../utils/"
import { UpdateCardT } from "../../types"
import { CardInfo } from "../card-info"
import { CardActivity } from "../card-activity"

interface Props {
  name:string,
  id:string,
  description:string,
  priority:string,
  dueDate: Date,
  status:string
}
export const Card = ({ status, id, name, description, dueDate, priority}:Props) => {
  const [updateCard] = useUpdateCardMutation()
  const [EditingMode, setEditingMode] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [deleteCard] = useDeleteCardMutation()
  const handleDelete = async (id:string) => {
    try {
      await deleteCard(id).unwrap()
    } catch (error) {
      console.error(error)
    }
  }
  const handleClose = () =>{
    setIsOpen(false)
  }
  const handleEdit = () =>{
    setIsOpen(true)
  }
  const handleUpdateCard = async (values: UpdateCardT ) => {
    try {
      await updateCard({id, data: {...values}}).unwrap
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-2 border-2 border-solid border-black p-2">
      <CardHeading
        name={name}
        handleDelete={() => handleDelete(id)}
        handleEdit={handleEdit}
      />
      <div className="text-md font-bold">
        {description.length > 40
          ? `${description.slice(0, 40)}...`
          : description}
      </div>
      <div className="text-md font-bold">{formatDate(dueDate)}</div>
      <div className="text-md font-bold">{priority}</div>
      <MySelect id={id} />
      <Modal open={isOpen} onClose={handleClose}>
        {EditingMode ? (
          <Form
            formType={FormType.Update}
            fn={(values) => handleUpdateCard(values)}
            initialValues={{ title: name, description, priority, dueDate }}
          />
        ) : (
          <CardInfo
            status={status}
            name={name}
            description={description}
            dueDate={formatDate(dueDate)}
            priority={priority}
          />
        )}
        <span
          className="flex items-center self-start lg:order-first"
        >
          <img src={editIcon} alt="edit icon" />
          <Button
            type="button"
            className="w-full border-0 px-2.5 py-1.5 font-bold hover:bg-white hover:text-black hover:shadow-md"
            onClick={() => setEditingMode((prev) => !prev)}
          >
            Edit
          </Button>
        </span>
        <CardActivity id={id} />
      </Modal>
    </div>
  );
}
