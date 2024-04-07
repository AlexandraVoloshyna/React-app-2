import { cn } from "../../../utils"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button (props: Props) {
  const { children, type, className, onClick, ...rest } = props
  
  return (
    <button
      className={cn(
        "cursor-pointer rounded border-2 border-solid border-black p-3 hover:bg-black hover:text-white",
        className,
      )}
      onClick={onClick}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}