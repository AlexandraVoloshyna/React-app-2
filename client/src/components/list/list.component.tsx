import { useDeleteListMutation } from "../../redux/lists-api.slice"
import { useCreateCardMutation } from "../../redux/cards-api.slice"
import { ICard } from "../../types"
import { Card } from "../card"
import { Button } from "../common/button"
import { ListHeading } from "../list-heading"


 interface Props {
  name:string
  id: string,
  key: string,
  cards: ICard[] | []
 }
export const List = ({name, cards, id}: Props) => {
  const [deleteList] = useDeleteListMutation()
  const [createCard] = useCreateCardMutation()
  const handleDelete = async (id:string) => {
    try {
      await deleteList(id).unwrap()
    } catch (error) {
      console.error(error)
    }
  }
  const handleCreateCard = async () => {
    try {
      await createCard({
        title: "Card name",
        priority: "high",
        description: "This is card description",
        listId: id
      }).unwrap()
    } catch (error) {
      console.error(error)
    }
  } 
  return (
    <div  className="flex flex-col gap-4">
      <ListHeading handleDelete={() => handleDelete(id)} name={name} id={id}/>
      <Button className="font-bold" onClick={handleCreateCard}> Add new card</Button>
      <div className="flex flex-col gap-4">
        {cards?.map((card:ICard) => (
          <Card
            key={card.id}
            id={card.id}
            name={card.title}
            description={card.description}
            dueDate={card.dueDate}
            priority={card.priority}
            status={name}
          />
        ))}
      </div>
    </div>
  )
}
