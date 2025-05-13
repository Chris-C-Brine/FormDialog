// src/components/buttons/FormSubmitButton.tsx
import { Badge } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { LoadingButton,  type LoadingButtonProps } from "./LoadingButton";
import { memo, useCallback } from "react";
import { useFormDialog } from "../../hooks";


export type FormSubmitButtonProps = Omit<LoadingButtonProps, "onClick"> & {
  showAttempts?: boolean;
  maxAttempts?: number;
};

/**
 * Form Submit Button
 */
export const FormSubmitButton = memo(function ({
  showAttempts,
  maxAttempts,
  children = "Save",
  ...props
}: FormSubmitButtonProps) {
  const { formState, getValues } = useFormContext();
  const { disabled: disabledForm } = useFormDialog();
  const disabled = formState.isSubmitting || formState.isLoading || props.disabled || disabledForm;
  const hasMaxAttempts = maxAttempts && isFinite(maxAttempts);

  const handleOnClick = useCallback(() => {
    if (disabled) return;
    console.log(getValues());
  }, [disabled, getValues]);

  return (
    <LoadingButton
      loading={!formState.isSubmitting || formState.isLoading}
      variant="contained"
      type="submit"
      size="large"
      disabled={disabled}
      {...props}
      onClick={handleOnClick}
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
