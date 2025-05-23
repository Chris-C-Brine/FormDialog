// src/components/FormDialog.tsx
import { useCallback, useMemo} from "react";
import {BaseDialog} from "./BaseDialog";
import { PaperForm} from "../forms/PaperForm";
import {type FieldValues} from "react-hook-form-mui";
import {IconButton, type PaperProps} from "@mui/material";
import {FormDialogProvider} from "../../state/FormDialogProvider";
import {merge} from "lodash";
import {Close as CloseIcon} from "@mui/icons-material";
import {FormDialogProps} from "../../types";

/**
 * A dialog component specialized for forms with integrated context providers
 *
 * FormDialog combines Material UI dialog functionality with React Hook Form,
 * creating a comprehensive solution for modal forms. It provides context
 * providers for form state management, dialog controls, and accessibility.
 *
 * Key features:
 * - Integrates React Hook Form with Material UI dialogs
 * - Provides form state management through FormProvider
 * - Establishes dialog context through FormDialogProvider
 * - Handles form submission and error states
 * - Supports loading states for form operations
 * - Maintains consistent styling and behavior
 *
 * Child components can access the form and dialog context through hooks:
 * - useFormContext() - Access form methods and state
 * - useFormState() - Access form validation state
 * - useFormDialog() - Access dialog controls and state
 *
 */
export const FormDialog = function <T extends FieldValues>({
    formProps,
    children,
    open,
    onClose,
    persistKey = "",
    ...dialogProps
  }: FormDialogProps<T>) {
  const PaperComponent = useCallback(
    (props: PaperProps) => <PaperForm persistKey={persistKey} formProps={formProps} {...props} />,
    [formProps, persistKey]
  );

  const baseDialogProps = useMemo(() => merge(
    {
      actionsProps: {sx: {pt: 2.5}},
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
  ), [dialogProps]);

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
            <CloseIcon fontSize="small" aria-label="close-form-dialog"/>
          </IconButton>
        }
        {...baseDialogProps}
      >
        {children}
      </BaseDialog>
    </FormDialogProvider>
  );
};

FormDialog.displayName = "FormDialog";
