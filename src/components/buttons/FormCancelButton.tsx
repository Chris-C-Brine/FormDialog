import { Button, type ButtonProps } from "@mui/material";
import { omit } from "lodash";
import { memo } from "react";
import { useFormDialog } from "../../hooks";

export type FormCancelButtonProps = Omit<ButtonProps, "onClick"> & {
    keepCount?: boolean;
};
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

