import {memo, useCallback, MouseEvent} from "react";
import {FormButtonProps, LoadingButtonProps} from "../../types";
import {LoadingButton} from "./LoadingButton";
import {useFormButton} from "../../hooks";
import {enabledWhileDirty} from "../../utils";

/**
 * A reset button for forms with context awareness and persistence integration
 *
 * This component extends the Material UI Button with form-specific reset functionality:
 * - Automatically resets the form using React Hook Form's reset method
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
 * // Customize appearance
 * <FormResetButton
 *   color="secondary"
 *   variant="text"
 *   size="small"
 * >
 *   Clear Form
 * </FormResetButton>
 */
export const FormResetButton = memo(function (props?: FormButtonProps) {
  const {
    formState,
    dialogState: {disabled: disabledForm},
    formContext: {reset}
  } = useFormButton();

  const handleOnClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    props?.onClick?.(e);
    if (!e.isDefaultPrevented()) reset();
  }, [props?.onClick, reset]);

  const disabled = enabledWhileDirty({formState, disabledForm});

  const buttonProps: LoadingButtonProps = {
    color: "primary",
    children: "RESET",
    variant: "outlined",
    type: "reset",
    size: "large",
    ...props,
    disabled
  };

  return (
    <LoadingButton {...buttonProps} onClick={handleOnClick}/>
  );
});

FormResetButton.displayName = "FormResetButton";
