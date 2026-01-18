// src/components/buttons/FormResetButton.tsx
import {Button, type ButtonProps} from "@mui/material";
import {omit} from "lodash";
import {memo, useCallback} from "react";
import {useFormContext, useFormState} from "react-hook-form-mui";
import {useFormDialog} from "../../hooks";
import {FormResetButtonProps} from "../../types";


/**
 * A reset button for forms with context awareness and persistence integration
 *
 * This component extends the Material UI Button with form-specific reset functionality:
 * - Automatically resets the form using React Hook Form's reset method
 * - Optionally clears persisted form data when a formKey is provided
 * - Auto-disables when the form is pristine (no changes to reset)
 * - Respects the form's busy state (submitting/loading)
 * - Integrates with FormDialog context for form-wide disabled state
 *
 * The button automatically handles disabled states based on:
 * - Form submission/loading status
 * - Form dirty state (disabled when form is pristine)
 * - Explicit disabled prop
 * - Form-wide disabled state from FormDialogContext
 *
 * @example
 * // With persistence integration
 * <FormResetButton formKey="user-profile-form" />
 *
 * @example
 * // Preserve submission count and customize appearance
 * <FormResetButton
 *   keepCount
 *   color="secondary"
 *   variant="text"
 *   size="small"
 * >
 *   Clear Form
 * </FormResetButton>
 */
export const FormResetButton = memo(function (props?: FormResetButtonProps) {
  const formKey = props?.formKey ?? "";
  const {reset} = useFormContext();
  const {isSubmitting, isLoading, isDirty} = useFormState();
  const {disabled: disabledForm} = useFormDialog();

  const keepSubmitCount = !!props?.keepCount;

  const handleOnClick = useCallback(() => {
    reset(undefined, {keepSubmitCount, keepIsSubmitted: keepSubmitCount});
  }, [keepSubmitCount, formKey, reset]);

  const isBusy = isSubmitting || isLoading;
  const isDisabled = props?.disabled || disabledForm;
  const isClean = !isDirty;

  const buttonProps: ButtonProps = {
    color: "primary",
    children: "RESET",
    variant: "outlined",
    type: "reset",
    size: "large",
    ...omit(props, ["keepCount", "disabled", "formKey"]),
  };

  return (
    <Button {...buttonProps} disabled={isBusy || isDisabled || isClean} onClick={handleOnClick}/>
  );
});

FormResetButton.displayName = "FormResetButton";
