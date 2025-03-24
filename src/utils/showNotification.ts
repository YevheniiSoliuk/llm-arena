import { toast, TypeOptions } from "react-toastify";

export const showNotification = (id: string, message: string, type: TypeOptions) => {
  toast(message, {
    toastId: id,
    type: type,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  });
};