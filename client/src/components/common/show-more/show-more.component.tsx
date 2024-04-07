import { Dropdown } from "../dropdown"
import menu from "../../../assets/menu.svg"
import { useState } from "react"

interface Props {
    handleEditing: () => void
    handleDeleting: () => void
}

export const ShowMore = ({ handleEditing, handleDeleting } : Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const handleDropdown = () =>{
    setIsDropdownOpen((prev) => !prev)
  }
  return (
    <div className="relative">
      <button type="button" onClick={handleDropdown}>
        <img src={menu} alt="menu icon" />
      </button>
      {isDropdownOpen && <Dropdown setIsOpen={setIsDropdownOpen} handleEdit={handleEditing} deleteAction={handleDeleting} />}
    </div>
  )
}
