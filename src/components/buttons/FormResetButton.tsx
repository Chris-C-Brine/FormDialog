// src/components/buttons/FormResetButton.tsx
import { Button, type ButtonProps } from "@mui/material";
import { omit } from "lodash";
import { memo, useCallback} from "react";
import { useFormContext, useFormState } from "react-hook-form-mui";
import { createFormChangeStore } from "../../state/createFormChangeStore";
import { useFormDialog } from "../../hooks";

export type FormResetButtonProps = Omit<ButtonProps, "onClick"> & {
  keepCount?: boolean;
  formKey?: string;
};

export const FormResetButton = memo(function (props?: FormResetButtonProps) {
  const formKey = props?.formKey ?? "";
  const { resetFormData } = createFormChangeStore(formKey)();
  const { reset } = useFormContext();
  const { isSubmitting, isLoading, isDirty } = useFormState();
  const { disabled: disabledForm } = useFormDialog();

  const keepSubmitCount = !!props?.keepCount;

  const handleOnClick = useCallback(() => {
    reset(undefined, { keepSubmitCount, keepIsSubmitted: keepSubmitCount });
    if (formKey) resetFormData();
  }, [keepSubmitCount, formKey, reset, resetFormData]);

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
    <Button {...buttonProps} disabled={isBusy || isDisabled || isClean} onClick={handleOnClick} />
  );
});

FormResetButton.displayName = "FormResetButton";
