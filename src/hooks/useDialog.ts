// src/hooks/useDialog.ts
import { useCallback, useState } from "react";

export interface UseDialogProps {
  /** Initial open state of the dialog */
  open: boolean,
  /** Whether to keep the dialog mounted when closed */
  keepMounted: boolean
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
 *   <Dialog {...dialogProps}>Dialog content</Dialog>
 * </>);
 *
 * @example
 * // With initial configuration
 * const { dialogProps } = useDialog({ open: true, keepMounted: false });
 *
 * @param props - Optional configuration options
 */

export const useDialog = (props?: UseDialogProps) => {
  const [open, setOpen] = useState(!!props?.open);
  const onClose = useCallback(() => setOpen(false), []);
  const openDialog = useCallback(() => setOpen(true), []);

  return {
    closeDialog: onClose,
    openDialog,
    dialogProps: { open, onClose, keepMounted: props?.keepMounted ?? true }
  };
};