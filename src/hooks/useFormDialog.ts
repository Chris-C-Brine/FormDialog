// src/components/dialogs/FormDialog/hooks/useFormDialog.ts
import { useContext } from "react";
import { FormDialogContext } from "../state/FormDialogContext";

/**
 * Hook for accessing the FormDialog context values and functions
 *
 * This hook provides access to the form dialog state and controls managed by
 * the FormDialogProvider. It allows components to interact with dialog state,
 * including open/close status and form-wide disabled state.
 *
 * The context provides:
 * - Dialog open state
 * - Close dialog function
 * - Form disabled state and setter function
 *
 * @throws Error if used outside a FormDialogProvider
 *
 * @example
 * // Using in a form button component
 * const FormButton = () => {
 *   const { openDialog, disabled } = useFormDialog();
 *   return (<Button
 *       disabled={disabled}
 *       onClick={() => openDialog()}
 *     >
 *       Cancel
 *     </Button>);
 * }
 *
 * @returns FormDialogContextType object containing dialog state and controls
 */
export const useFormDialog = () => {
  const context = useContext(FormDialogContext);
  if (!context) {
    throw new Error("useFormDialog must be used within a FormDialogProvider");
  }
  return context;
};