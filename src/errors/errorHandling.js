import { toast } from "react-toastify"

export const handleError = (error) => {
    const { code, message } = error

    toast.error(`Error! ${code}, ${message}`, {
        autoClose: 5000,
        pauseOnHover: false
      })
}