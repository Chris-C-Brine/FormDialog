// src/components/FormDialogActions.tsx
import {Grid, GridProps} from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import { FormCancelButton, type FormCancelButtonProps } from "../buttons/FormCancelButton";
import { FormResetButton, type FormResetButtonProps } from "../buttons/FormResetButton";
import { FormSubmitButton, FormSubmitButtonProps } from "../buttons/FormSubmitButton";
import { GridSpacer } from "../GridSpacer";
import { useMaxAttempts } from "../../hooks";
import {applyDefaultFormDialogProps} from "../../utils";

/**
 * Props for the FormDialogActions component
 */
export type FormDialogActionsProps = Partial<PropsWithChildren> & {
    /**
     * Props to customize the cancel button
     */
    cancelProps?: FormCancelButtonProps;

    /**
     * Props to customize the reset button
     */
    resetProps?: FormResetButtonProps;

    /**
     * Props to customize the submit button
     */
    submitProps?: FormSubmitButtonProps;

    /**
     * Display variant for the buttons
     * - "icon": Shows only icons
     * - "text": Shows only text
     * - "iconText": Shows both icons and text
     */
    variant?: "icon" | "text" | "iconText";

    /**
     * Whether to hide the cancel button completely
     * @default false
     */
    removeCancelButton?: boolean;

    /**
     * Whether to hide the reset button completely
     * @default false
     */
    removeResetButton?: boolean;

    /**
     * Props to customize the containing Grid
     */
    gridProps?: GridProps
};

/**
 * Standard set of form dialog action buttons with consistent styling and behavior
 *
 * This component renders a consistent set of form action buttons (cancel, reset, submit)
 * in a responsive grid layout. It integrates with the form dialog context to handle
 * form state and provides built-in support for form attempt limiting.
 *
 * Key features:
 * - Standardized button placement and styling
 * - Support for maximum submission attempts via the maxAttempts prop
 * - Ability to selectively show/hide specific buttons
 * - Customization options for all buttons and the container grid
 * - Flexible display variants (icon, text, or both)
 * - Automatic integration with form dialog context
 *
 * By default, the component displays cancel, reset, and submit buttons with a spacer
 * between them for responsive alignment.
 *
 * @example
 * // Basic usage
 * <FormDialogActions />
 *
 * @example
 * // With maximum attempts and customized buttons
 * <FormDialogActions
 *   submitProps={{ maxAttempts: 3, children: "Save Changes" }}
 *   resetProps={{ formKey: "user-profile" }}
 * />
 *
 * @example
 * // Hiding buttons and customizing layout
 * <FormDialogActions
 *   removeResetButton
 *   removeCancelButton
 *   gridProps={{ justifyContent: "center", mt: 3 }}
 * />
 */
export const FormDialogActions: FC<FormDialogActionsProps> = ({
  resetProps,
  submitProps,
  cancelProps,
  children,
  variant,
  removeCancelButton = false,
  removeResetButton = false,
  gridProps
}) => {
  // Disable the form when the count exceeds the maxAttempts
  useMaxAttempts({ maxAttempts: submitProps?.maxAttempts || Infinity });

  // Apply default props to the buttons and grid container
  const { gridContainerProps, cancelButtonProps, resetButtonProps, submitButtonProps } =
      applyDefaultFormDialogProps({ resetProps, submitProps, cancelProps, gridProps, variant });

  return (
    <Grid container {...gridContainerProps}>
        {!removeCancelButton && <Grid>
            <FormCancelButton {...cancelButtonProps} />
        </Grid>}
        {!removeResetButton && <Grid>
            <FormResetButton {...resetButtonProps} />
        </Grid>}
      {children ?? <GridSpacer />}
      <Grid>
        <FormSubmitButton {...submitButtonProps} />
      </Grid>
    </Grid>
  );
};