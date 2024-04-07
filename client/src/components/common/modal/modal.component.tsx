import { PropsWithChildren, useEffect } from "react"
import ReactDom from "react-dom"


interface Props extends PropsWithChildren{
  open: boolean,
  onClose: () => void
}

export const Modal = ({ open, children, onClose }: Props) => {
  useEffect( () => {
    open ? document.body.classList.add("lock") : document.body.classList.remove("lock"); 
  }, [open]);

  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[1000] bg-black opacity-[.7]" />
      <div className="fixed top-1/2 left-1/2 h-[90vh]  w-[90vw] transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-lg bg-aliceblue">
        <div className="min-h-12 bg-blue-600 text-white p-4 text-right">
          <button onClick={onClose}>Close Modal</button>
        </div>
        <div className="flex gap-2 h-83vh px-3 pt-14 pb-0 lg:flex-col" >
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal")!
  )
}
