import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const handleError = (error?: any, message?: string) => {
  if (isAxiosError<{ content: string }>(error)) {
    toast.error(message || error.response.data.content);
  }
};
