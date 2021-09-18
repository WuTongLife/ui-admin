import { useState, useMemo } from "react";

const useModal = () => {
  const [visible, setVisible] = useState(false);

  const {} = useMemo(() => {
    return {
      open: () => setVisible(true),
      close: () => setVisible(false)
    };
  }, []);

  return [];
};

export default useModal;
