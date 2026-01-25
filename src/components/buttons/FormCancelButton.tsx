import {memo, MouseEvent, useCallback} from "react";
import {useFormButton} from "../../hooks";
import {FormButtonProps, LoadingButtonProps} from "../../types";
import {LoadingButton} from "./LoadingButton";


/**
 * A cancel button component that integrates with FormDialogContext.
 * Automatically closes the parent dialog when clicked.
 *
 * @example
 * // Basic usage
 * <FormCancelButton />
 *
 * @example
 * // With custom styling
 * <FormCancelButton
 *   color="secondary"
 *   variant="text"
 *   children="Go Back"
 * />
 */
export const FormCancelButton = memo(function (props?: FormButtonProps) {
  const {dialogState: {closeDialog}} = useFormButton();

  const handleOnClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    props?.onClick?.(e);
    if (e.isDefaultPrevented()) return;
    closeDialog?.(e, "escapeKeyDown");
  }, [closeDialog, props?.onClick]);

  const buttonProps: LoadingButtonProps = {
    color: "error",
    children: "CANCEL",
    variant: "outlined",
    size: "large",
    ...props
  };

  return <LoadingButton {...buttonProps} onClick={handleOnClick}/>;
});

FormCancelButton.displayName = "FormCancelButton";

