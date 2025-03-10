import { useState } from "react";

export const useMessage = () => {
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (onClose: () => void) => {
    console.log("Mensaje enviado: ", message);
    setMessage("");
    onClose();
  };

  return { message, handleMessageChange, handleSendMessage };
};
