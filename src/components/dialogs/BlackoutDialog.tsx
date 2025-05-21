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

  /**
   * 1) When you open a dialog via a button, the button's ancestor gets aria-hidden, presumably so that
   *    screen readers (SR) can't interact with it while the dialog is open.
   * 2) When you close the dialog, the aria-hidden is removed so that SRs can interact with the button again.
   * 3) Also, when closing, the focus is moved back on the opener button.
   *
   * Now comes the important part. You get Blocked aria-hidden on a <div> only when 3 happens before 2. In this case,
   *    as the error message explains, we are trying to place focus somewhere where SRs don't have access, which is
   *    a No No, and browsers correctly warn about it.
   *
   * This ordering is dependent on the closeAfterTransition prop on the MUI Dialog. When false and user triggers
   * dialog close, aria-hidden is removed (2) and then focus is placed on the opener button (3). Meaning there is no
   * issue. You can see it in action here. However, when it's true (the default), the order is the other way around,
   * and you get the warning.
   */
  return (
    <Dialog closeAfterTransition={false} open={open} id={id} sx={sxProps} {...props}>
      {children}
    </Dialog>
  );
};
