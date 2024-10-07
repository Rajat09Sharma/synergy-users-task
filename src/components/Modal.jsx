import { useEffect, useRef } from "react"

export default function Modal({ open,onClose,children }) {
    const dialog = useRef();

    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open])


    return (
        <dialog ref={dialog} onClose={onClose} className="w-75">
        {children}
        </dialog>
    )
}
