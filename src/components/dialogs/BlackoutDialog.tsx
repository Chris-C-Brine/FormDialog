// src/components/BlackoutDialog.tsx
import { Dialog, type DialogProps } from "@mui/material";
import { type FC } from "react";

export type BlackoutDialogProps = Omit<DialogProps, "title"> & {
    /**
     * An optional unique string identifier
     * @default 'blackout-dialog'
     */
    id?: string;

    /**
     * Whether the dialog is currently visible.
     * @default false
     */
    open: boolean;

    /**
     * Whether to apply a black overlay behind the dialog.
     * @default false
     */
    blackout?: boolean;
  };

/**
 * A component for rendering a modal dialog with an optional blackout effect.
 */
export const BlackoutDialog: FC<BlackoutDialogProps> = ({
  open = false,
  blackout = false,
  id = "blackout-dialog",
  children,
  sx,
  ...props
}) => {
  const sxProps = blackout ? { ...sx, backgroundColor: "black" } : sx;

  return (
    <Dialog open={open} id={id} {...props} sx={sxProps}>
      {children}
    </Dialog>
  );
};
