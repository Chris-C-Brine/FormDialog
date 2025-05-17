// src/hooks/useDialog.ts
import {useCallback, useRef, useState} from "react";
import {DialogProps} from "@mui/material";

export interface UseDialogProps {
  /** Initial open state of the dialog */
  open?: boolean,
  /** Additional props to spread onto the dialog component */
  dialogProps?: Omit<DialogProps, "open" | "onClose">
}

export interface UseDialogReturn extends Omit<DialogProps, "open" | "onClose"> {
  /** Function to close the dialog */
  closeDialog: () => void;
  /** Function to open the dialog */
  openDialog: () => void;
  /** Props to spread onto the dialog component */
  dialogProps: DialogProps & {
    open: boolean;
    onClose: () => void;
  };
}

/**
 * Hook for managing dialog state and providing dialog control functions
 *
 * This hook provides a simple way to manage the dialog state and returns
 * functions to open and close the dialog, along with props that can be
 * spread onto a Material-UI Dialog component.
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
 *
 * @param props - Optional configuration options
 */
export const useDialog = (props?: UseDialogProps): UseDialogReturn => {
  const [open, setOpen] = useState(!!props?.open);
  const previousFocus = useRef<HTMLElement | null>(null);


  const onClose = useCallback(() => {
    setOpen(false);
    // Restore focus after a small delay to ensure the dialog has fully closed
    setTimeout(() => {
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    }, 100);
  }, []);

  const openDialog = useCallback(() => {
    // Store the current active element before opening dialog
    previousFocus.current = document.activeElement as HTMLElement;
    setOpen(true);
  }, []);


  return {
    closeDialog: onClose,
    openDialog,
    dialogProps: {
      open,
      onClose,
      // Add to ensure that the dialog properly handles focus
      disableRestoreFocus: true,
      disableEnforceFocus: false,
      disableAutoFocus: false,
      ...props?.dialogProps}
  };
};