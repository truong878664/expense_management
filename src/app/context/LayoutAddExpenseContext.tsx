import { createContext } from "react";

export const LayoutAddExpenseContext = createContext<{ onDismiss: () => void }>(
  { onDismiss: () => {} },
);
