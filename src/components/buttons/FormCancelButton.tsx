import { Button, type ButtonProps } from "@mui/material";
import { omit } from "lodash";
import { memo } from "react";
import { useFormDialog } from "../../hooks";
import {FormCancelButtonProps} from "../../types";


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
export const FormCancelButton = memo(function (props?: FormCancelButtonProps) {
    const {closeDialog} = useFormDialog();

    const buttonProps: ButtonProps = {
        children: "Cancel",
        variant: "outlined",
        size: "large",
        color: "error",
        ...omit(props ?? {}, "keepCount")
    };
    return <Button {...buttonProps} onClick={(e) => closeDialog?.(e, "escapeKeyDown")}/>;
});

FormCancelButton.displayName = "FormCancelButton";

