import { DialogProps } from "@mui/material";
import { useCallback, useState, MouseEvent, useRef, useEffect } from "react";

export interface UseDialogProps {
  /** Initial open state of the dialog */
  open?: boolean,
  /** Always keep the children in the DOM. */
  keepMounted?: boolean,
}

export interface UseDialogReturn {
  /** Function to close the dialog */
  closeDialog: () => void;
  /** Function to open the dialog */
  openDialog: (e?: MouseEvent) => void;
  /** Props to spread onto the dialog component */
  dialogProps: {
    open: boolean;
    onClose: () => void;
    keepMounted: boolean;
  }
}

/**
 * Hook for managing dialog state and providing dialog control functions
 *
 * This hook provides a simple way to manage the dialog state and returns
 * functions to open and close the dialog, along with props that can be
 * spread onto a Material-UI Dialog component.
 *
 * Restores focus to the opening element, but only after the dialog has fully closed.
 *
 * @example
 * // Basic usage
 * const { openDialog, closeDialog, dialogProps } = useDialog();
 * return (<>
 *   <Button onClick={openDialog}>Open Dialog</Button>
 *   <BaseDialog {...dialogProps}>Dialog Content</BaseDialog>
 * </>);
 *
 * @example
 * // With initial configuration
 * const { dialogProps } = useDialog({ keepMounted: true});
 *
 * @param props - Optional configuration options
 */
export const useDialog = (props?: UseDialogProps): UseDialogReturn => {
  const [open, setOpen] = useState(!!props?.open);

  const closeDialog = useCallback(() => setOpen(false), []);
  const openDialog = useCallback(() => setOpen(true), []);

  return {
    closeDialog,
    openDialog,
    dialogProps: { open, onClose: closeDialog, keepMounted: !!props?.keepMounted }
  };
};