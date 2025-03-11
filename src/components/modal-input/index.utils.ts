import { useState } from "react";

// Validaciones
const validateMessage = (message: string) => {
  if (message.trim() === "") {
    return "El mensaje no puede estar vacio";
  }
  if (message.length < 5) {
    return "El mensaje debe tener al menos 5 caracteres";
  }

  return "";
}

export const useMessage = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);

    if (error) {
      setError(""); // Reset error message
    }
  };

  const handleSendMessage = (onClose: () => void) => {
    const errorMessage = validateMessage(message);

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    console.log("Mensaje enviado: ", message);
    setMessage("");
    setError("");
    onClose();
  };

  const clearError = () => {
    setError("");
    setMessage(""); 
  };

  return { message, error, handleMessageChange, handleSendMessage, clearError };
};
