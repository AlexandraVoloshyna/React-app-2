import { List } from "../../components/list"
import { useGetListsByBoardIdQuery } from "../../redux/lists-api.slice"
import { IList } from "../../types"
import { Sidebar } from "../../components/sidebar"
import { useParams } from "react-router-dom"



export const BoardPage  = () => {
  const { id } = useParams<string>();
  const { data: lists, error:err, isLoading} = useGetListsByBoardIdQuery(id as string)
  if (isLoading) return <div>Loading...</div>
  if (err)  "status" in err ? console.error(err.data) : console.error(err.message)
  return (
    <>
      <div className="grid-cols-auto-fill max-w-[1200px] px-4 mx-auto grid justify-center gap-2">
        {lists?.data.map((list: IList) => (
          <List
            key={list.id}
            id={list.id}
            name={list.title}
            cards={list.cards}
          />
        ))}
      </div>
      <Sidebar boardId={id as string} />
    </>
  );
}
