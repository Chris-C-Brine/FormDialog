// src/components/buttons/FormSubmitButton.tsx
import {LoadingButton} from "./LoadingButton";
import {memo} from "react";
import {useFormButton} from "../../hooks";
import type {FormButtonProps} from "../../types";
import {disabledWhileLoading} from "../../utils";

/**
 * A "submit button" for forms with loading state, attempt tracking, and form context awareness
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
 * // With custom text and props
 * <FormSubmitButton
 *   color="secondary"
 *   fullWidth
 * >
 *   Save Changes
 * </FormSubmitButton>
 */
export const FormSubmitButton = memo(
  function (
    {
      children = "Save",
      ...props
    }: FormButtonProps) {
    const {formState, dialogState: {disabled: disabledForm}} = useFormButton();

    const disabled = disabledWhileLoading({formState, disabledForm})

    return (
      <LoadingButton
        loading={formState.isSubmitting || formState.isLoading}
        variant="contained"
        type="submit"
        size="large"
        disabled={disabled}
        {...props}
      >
        {children}
      </LoadingButton>
    );
  });

FormSubmitButton.displayName = "FormSubmitButton";
