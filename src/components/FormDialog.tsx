// src/components/FormDialog.tsx
import { useCallback,  useMemo } from "react";
import { BaseDialog, type BaseDialogProps } from "./BaseDialog";
import { PaperForm } from "./PaperForm";
import { type FieldValues, type FormContainerProps } from "react-hook-form-mui";
import { IconButton, type PaperProps } from "@mui/material";
import { FormDialogProvider } from "../state/FormDialogProvider";
import { merge } from "lodash";
import { Close as CloseIcon } from "@mui/icons-material";

/**
 * Props for the FormDialog component. Inherits from BaseDialogProps and adds formProps.
 * @param formProps - Props for the FormContainer component from react-hook-form-mui.
 * @returns The FormDialog component.
 */
export type FormDialogProps<T extends FieldValues> = Omit<BaseDialogProps, "PaperComponent"> & {
  formProps: FormContainerProps<T>;
};

export const FormDialog = <T extends FieldValues,>({
  formProps,
  children,
  open,
  onClose,
  ...dialogProps
}: FormDialogProps<T>) => {
  const PaperComponent = useCallback(
    (props: PaperProps) => <PaperForm formProps={formProps} {...props} />,
    [formProps]
  );

  const baseDialogProps = useMemo(
    () =>
    merge(
        {
          actionsProps: { sx: { pt: 2.5 } },
          contentProps: {
            sx: {
              display: "flex",
              justifyContent: "center",
              boxSizing: "border-box",
              maxHeight: `calc(100vh - 235px)`, // 235 estimate using H4 title & default FormDialogActions
            },
          },
        },
        dialogProps
      ),
    [dialogProps]
  );



  return (
    <FormDialogProvider open={open} closeDialog={onClose}>
      <BaseDialog
        PaperComponent={PaperComponent}
        open={open}
        onClose={onClose}
        closeButton={
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onClick={(e) => onClose?.(e, 'escapeKeyDown')}
          >
            <CloseIcon fontSize="small" aria-label="close-form-dialog" />
          </IconButton>
        }
        {...baseDialogProps}
      >
        {children}
      </BaseDialog>
    </FormDialogProvider>
  );
};