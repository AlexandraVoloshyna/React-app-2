import Select from "react-select";
import { useGetOptionsQuery } from "../../../redux/lists-api.slice";
import { useMoveCardMutation } from "../../../redux/cards-api.slice";
import { useState } from "react";
import { SingleValue } from "react-select";
import { IOption } from "../../../types";

 interface Props {
  id: string
 }

export const MySelect = ({ id }:Props) => {
  const [ value ] = useState({value: "move to", label:"Move to"})
  const { data: options } = useGetOptionsQuery();
  const [ moveCard ] = useMoveCardMutation()
  const handleChange = async (selectedOption: SingleValue<IOption>) =>{
    try {
      if (selectedOption?.value){
        const newListTitle = selectedOption.value;
        await moveCard({ id, data: { newListTitle } }).unwrap(); 
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Select
      options={options?.data}
      defaultValue={value}
      onChange={handleChange}
      isSearchable={false}
      menuPortalTarget={document.body}
      menuPosition="fixed"
    />
  )
}
