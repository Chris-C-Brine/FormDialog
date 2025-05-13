// src/components/dialogs/FormDialog/hooks/useFormDialog.ts
import { useContext } from "react";
import { FormDialogContext } from "../state/FormDialogContext";

export const useFormDialog = () => {
  const context = useContext(FormDialogContext);
  if (!context) {
    throw new Error("useFormDialog must be used within a FormDialogProvider");
  }
  return context;
};