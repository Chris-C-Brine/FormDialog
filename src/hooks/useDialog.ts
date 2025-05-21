import { useCallback, useState } from "react";
import {UseDialogProps, UseDialogReturn} from "../types";


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