// src/components/buttons/FormSubmitButton.tsx
import { Badge } from "@mui/material";
import { LoadingButton,  type LoadingButtonProps } from "./LoadingButton";
import { memo } from "react";
import { useFormDialog } from "../../hooks";
import {useFormState} from "react-hook-form-mui";

/**
 * Props for the FormSubmitButton component
 */
export type FormSubmitButtonProps = Omit<LoadingButtonProps, "onClick"> & {
  /**
   * Whether to show the submission attempt count badge
   */
  showAttempts?: boolean;

  /**
   * Maximum number of submission attempts allowed
   * When reached, the button displays a visual indicator
   */
  maxAttempts?: number;
};

/**
 * A "submit button" for forms with loading state, attempt tracking and form context awareness
 *
 * This component extends the LoadingButton with form-specific features:
 * - Automatically displays loading state during form submission
 * - Tracks and displays submission attempt count (optional)
 * - Supports maximum attempts with visual indicators
 * - Integrates with FormDialog context for form-wide disabled state
 *
 * The button automatically handles disabled states based on:
 * - Form submission status
 * - Form loading status
 * - Explicit-disabled prop
 * - Form-wide disabled state from FormDialogContext
 *
 *
 * @example
 * // With custom text and max attempts
 * <FormSubmitButton maxAttempts={3}>
 *   Submit Form
 * </FormSubmitButton>
 *
 * @example
 * // With visible attempt counter and custom props
 * <FormSubmitButton
 *   showAttempts
 *   color="secondary"
 *   fullWidth
 * >
 *   Save Changes
 * </FormSubmitButton>
 */
export const FormSubmitButton = memo(function ({
  showAttempts,
  maxAttempts,
  children = "Save",
  ...props
}: FormSubmitButtonProps) {
  const formState = useFormState();
  const { disabled: disabledForm } = useFormDialog();
  const disabled = formState.isSubmitting || formState.isLoading || props.disabled || disabledForm;
  const hasMaxAttempts = maxAttempts && isFinite(maxAttempts);

  return (
    <LoadingButton
      loading={formState.isSubmitting || formState.isLoading}
      variant="contained"
      type="submit"
      size="large"
      disabled={disabled}
      {...props}
    >
      {
        <Badge
          badgeContent={formState.submitCount || (formState.disabled ? maxAttempts : undefined)}
          color={disabled ? "error" : "warning"}
          invisible={!hasMaxAttempts && !showAttempts}
        >
          {children}
        </Badge>
      }
    </LoadingButton>
  );
});

FormSubmitButton.displayName = "FormSubmitButton";
