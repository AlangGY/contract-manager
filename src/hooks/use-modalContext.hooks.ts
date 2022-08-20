import { useCallback, useState } from "react";

export default function useModalContext(initialVisible?: boolean) {
  const [isVisible, setIsVisible] = useState(initialVisible || false);

  const handleOpen = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  return { isVisible, openModal: handleOpen, closeModal: handleClose };
}
