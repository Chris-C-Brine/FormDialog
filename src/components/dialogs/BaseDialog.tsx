// src/components/BaseDialog.tsx
import type { FC, ReactNode } from "react";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { BlackoutDialog, type BlackoutDialogProps } from "./BlackoutDialog";
import type { DialogContentProps, DialogTitleProps, DialogActionsProps } from "@mui/material";

export type BaseDialogProps = Omit<BlackoutDialogProps, "children" | "title" | "content"> & {
  /**
   * Title content for the dialog
   * When provided, renders a DialogTitle component
   */
  title?: ReactNode;

  /**
   * Props passed to the DialogTitle component
   * Only applied when title is provided
   */
  titleProps?: DialogTitleProps;

  /**
   * Main content of the dialog
   * When provided, renders a DialogContent component
   */
  children?: ReactNode;

  /**
   * Props passed to the DialogContent component
   * Only applied when children is provided
   */
  contentProps?: DialogContentProps;

  /**
   * Action buttons for the dialog footer
   * When provided, renders a DialogActions component
   */
  actions?: ReactNode;

  /**
   * Props passed to the DialogActions component
   * Only applied when actions is provided
   */
  actionsProps?: DialogActionsProps;

  /**
   * Optional close button that appears in the header
   * Positioned adjacent to the title
   */
  closeButton?: ReactNode;
};

/**
 * A flexible dialog component with standardized structure and styling
 *
 * BaseDialog provides a consistent dialog layout with optional title, content,
 * and action sections. It builds upon the BlackoutDialog component, adding
 * structure through Material UI's dialog subcomponents.
 *
 * Key features:
 * - Consistent dialog structure with title, content, and actions areas
 * - Optional rendering of each section based on provided props
 * - Full control over styling and props for each section
 * - Standardized minimum width and spacing
 * - Support for a dedicated close button in the header
 *
 * The component automatically renders only the sections for which content
 * is provided, allowing for flexible dialog layouts while maintaining
 * consistent styling and behavior.
 *
 * @example
 * // Basic usage with all sections
 * <BaseDialog
 *   open={open}
 *   onClose={handleClose}
 *   title="Confirmation"
 *   actions={
 *     <>
 *       <Button onClick={handleCancel}>Cancel</Button>
 *       <Button onClick={handleConfirm}>Confirm</Button>
 *     </>
 *   }
 * >
 *   Are you sure you want to proceed?
 * </BaseDialog>
 *
 * @example
 * // Customized with section props
 * <BaseDialog
 *   open={isOpen}
 *   title="Advanced Settings"
 *   titleProps={{ sx: { bgcolor: 'primary.main', color: 'white' } }}
 *   contentProps={{ sx: { p: 3 } }}
 *   actionsProps={{ sx: { justifyContent: 'space-between' } }}
 *   actions={<SettingsDialogActions />}
 * >
 *   <SettingsForm />
 * </BaseDialog>
 */
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
