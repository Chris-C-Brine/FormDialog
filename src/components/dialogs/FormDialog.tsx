// src/components/FormDialog.tsx
import {useCallback} from "react";
import {BaseDialog, type BaseDialogProps} from "./BaseDialog";
import {PaperForm} from "../forms/PaperForm";
import {type FieldValues, type FormContainerProps} from "react-hook-form-mui";
import {IconButton, type PaperProps} from "@mui/material";
import {FormDialogProvider} from "../../state/FormDialogProvider";
import {merge} from "lodash";
import {Close as CloseIcon} from "@mui/icons-material";

/**
 * Props for the FormDialog component
 */
export type FormDialogProps<T extends FieldValues> = Omit<BaseDialogProps, "PaperComponent"> & {
  /**
   * Form methods from useForm hook
   * Establish the form context for child components
   */
  formProps: FormContainerProps<T>;
};

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
export const FormDialog = <T extends FieldValues, >({
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

  const FormDialogContent = useCallback(() => (<BaseDialog
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
    disableRestoreFocus={true}
    disableEnforceFocus={false}
    disableAutoFocus={false}
    {...merge(
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
    )}
  >
    {children}
  </BaseDialog>), [open, onClose, dialogProps, children, PaperComponent]);

  return (
    <FormDialogProvider open={open} closeDialog={onClose}>
      <FormDialogContent/>
    </FormDialogProvider>
  );
};
