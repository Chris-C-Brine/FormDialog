// src/components/BaseDialog.tsx
import type { FC } from "react";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { BlackoutDialog } from "./BlackoutDialog";
import {BaseDialogProps} from "../../types";




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
 * // Customized with section props
 * <BaseDialog
 *   open={isOpen}
 *   title="Advanced Settings"
 *   titleProps={{ sx: { backgroundColor: 'primary.main', color: 'white' } }}
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
    ...props
}) => (
  <BlackoutDialog
    id={id}
    {...props}
  >
    {title && <DialogTitle {...titleProps}>{title}</DialogTitle>} {closeButton}
    {children && <DialogContent {...contentProps}>{children}</DialogContent>}
    {actions && <DialogActions {...actionsProps}>{actions}</DialogActions>}
  </BlackoutDialog>
);
