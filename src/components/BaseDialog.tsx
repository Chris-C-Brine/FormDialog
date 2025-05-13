// src/components/BaseDialog.tsx
import type { FC, ReactNode } from "react";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { BlackoutDialog, type BlackoutDialogProps } from "./BlackoutDialog";
import type { DialogContentProps, DialogTitleProps, DialogActionsProps } from "@mui/material";

export type BaseDialogProps = Omit<BlackoutDialogProps, "children" | "title" | "content"> & {
  title?: ReactNode;
  titleProps?: DialogTitleProps;
  children?: ReactNode;
  contentProps?: DialogContentProps;
  actions?: ReactNode;
  actionsProps?: DialogActionsProps;
  closeButton?: ReactNode;
};

export const BaseDialog: FC<BaseDialogProps> = ({
  title = null,
  closeButton,
  titleProps,
  children = null,
  contentProps,
  id,
  actions = null,
  actionsProps,
  sx,
  ...props
}) => (
  <BlackoutDialog
    id={id}
    sx={{
      "& .MuiDialog-container": {
        "& .MuiPaper-root": {
          minWidth: "max-content",
          mb: 2,
          borderRadius: "30px",
        },
      },
      ...sx,
    }}
    {...props}
  >
    {title && <DialogTitle {...titleProps}>{title}</DialogTitle>} {closeButton}
    {children && <DialogContent {...contentProps}>{children}</DialogContent>}
    {actions && <DialogActions {...actionsProps}>{actions}</DialogActions>}
  </BlackoutDialog>
);
