import type {
  ButtonProps,
  CircularProgressProps,
  DialogActionsProps,
  DialogContentProps,
  DialogProps,
  DialogTitleProps,
  GridProps,
  PaperProps
} from "@mui/material";
import {
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  type Dispatch,
  type SetStateAction
} from "react";
import {FieldValues, type FormContainerProps} from "react-hook-form-mui";

/**
 * Props for the FormCancelButton component
 */
export type FormCancelButtonProps = Omit<ButtonProps, "onClick"> & {
  /**
   * Display variant for the button, determining whether to show icon, text, or both.
   * Inherited from FormDialogActionsProps.
   */
  iconVariant?: FormDialogActionsProps['variant']
};

/**
 * Props for the FormResetButton component
 */
export type FormResetButtonProps = Omit<ButtonProps, "onClick"> & {
  /**
   * Display variant for the button.
   */
  iconVariant?: FormDialogActionsProps['variant'],

  /**
   * A unique identifier for the form associated with this reset button
   * When provided, also clears persisted form data from storage
   */
  formKey?: string;

  /**
   * Whether to preserve the submission count when resetting the form.
   * When true, the form's submitCount will be maintained after reset.
   */
  keepCount?: boolean;
};

/**
 * Props for the FormSubmitButton component
 */
export type FormSubmitButtonProps = Omit<LoadingButtonProps, "onClick"> & {
  /**
   * Display variant for the button.
   */
  iconVariant?: FormDialogActionsProps['variant'],
  /**
   * Whether to show the submission attempt count badge
   */
  showAttempts?: boolean;

  /**
   * Maximum number of submission attempts allowed
   * When reached, the button displays a visual indicator
   */
  maxAttempts?: number;
};

/**
 * Props for the LoadingButton component
 */
export type LoadingButtonProps = ButtonProps & {
  /**
   * Controls the loading state of the button
   * When false, displays a loading spinner; when true or undefined, displays normal content
   */
  loading?: boolean;

  loadingIconProps?: CircularProgressProps,

  /**
   * Optional icon to display when the button is not in loading state
   * Can be used to provide a visual indicator of the button's action
   */
  altIcon?: ReactNode;
};

/**
 * Props for the BaseDialog component, extending BlackoutDialog with standard layout sections.
 */
export type BaseDialogProps = BlackoutDialogProps & {
  /**
   * Title content for the dialog
   * When provided, renders a DialogTitle component
   */
  title?: ReactNode;

  /**
   * Props passed to the DialogTitle component
   * Only applied when the title is provided
   */
  titleProps?: DialogTitleProps;

  /**
   * Props passed to the DialogContent component
   * Only applied when children are provided
   */
  contentProps?: DialogContentProps;

  /**
   * Action buttons for the dialog footer
   * When provided, renders a DialogActions component
   */
  actions?: ReactNode;

  /**
   * Props passed to the DialogActions component
   * Only applied when actions are provided
   */
  actionsProps?: DialogActionsProps;

  /**
   * Optional close button that appears in the header
   * Positioned adjacent to the title
   */
  closeButton?: ReactNode;
};

/**
 * Props for the BaseDialog component, extending BlackoutDialog with standard layout sections.
 */
export type BlackoutDialogProps = Omit<DialogProps, "title"> & {
  /**
   * An optional unique string identifier
   * @default 'blackout-dialog'
   */
  id?: string;

  /**
   * Whether the dialog is currently visible.
   * @default false
   */
  open: boolean;

  /**
   * Whether to apply a black overlay behind the dialog.
   * @default false
   */
  blackout?: boolean;
};

/**
 * Props for the FormDialog component
 */
export type FormDialogProps<T extends FieldValues> = Omit<BaseDialogProps, "PaperComponent"> & CommonFormProps<T>;

/**
 * Props for the FormDialogActions component
 */
export type FormDialogActionsProps = Partial<PropsWithChildren> & {
  /**
   * Props to customize the cancel button
   */
  cancelProps?: FormCancelButtonProps;

  /**
   * Props to customize the reset button
   */
  resetProps?: FormResetButtonProps;

  /**
   * Props to customize the "submit button"
   */
  submitProps?: FormSubmitButtonProps;

  /**
   * Display variant for the buttons
   * - "icon": Shows only icons
   * - "text": Shows only text
   * - "iconText": Shows both icons and text
   */
  variant?: "icon" | "text" | "iconText";

  /**
   * Whether to hide the cancel button completely
   * @default false
   */
  removeCancelButton?: boolean;

  /**
   * Whether to hide the reset button completely
   * @default false
   */
  removeResetButton?: boolean;

  /**
   * Props to customize the containing Grid
   */
  gridProps?: GridProps
};

export type CommonFormProps<T extends FieldValues> = {
  /**
   * Props to configure the form container
   * This includes settings for form state, validation, and submission handling
   */
  formProps: FormContainerProps<T>;
};

/**
 * Props for the PaperForm component
 */
export type PaperFormProps<T extends FieldValues> = PaperProps & CommonFormProps<T>;

export interface UseDialogProps {
  /** Initial open state of the dialog */
  open?: boolean,
  /** Always keep the children in the DOM. */
  keepMounted?: boolean,
}

export interface UseDialogReturn {
  /** Function to close the dialog */
  closeDialog: () => void;
  /** Function to open the dialog */
  openDialog: (e?: MouseEvent) => void;
  /** Props to spread onto the dialog component */
  dialogProps: {
    open: boolean;
    onClose: () => void;
    keepMounted: boolean;
  }
}

export type UseMaxAttemptProps = {
  maxAttempts?: number;
};

export type FormDialogContextType = {
  open?: boolean;
  closeDialog?: DialogProps['onClose'];
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

/**
 * Props for the FormDialogProvider component
 *
 * Extends React's PropsWithChildren and allows optional passing of dialog state
 * (open state and close handler) directly to the provider.
 */
export interface FormDialogProviderProps extends PropsWithChildren, Partial<Pick<FormDialogContextType, "open" | "closeDialog">> {
}

export type ApplyDefaultFormDialogPropsProps = Pick<
  FormDialogActionsProps,
  "resetProps" | "submitProps" | "variant"
> & Partial<Pick<FormDialogActionsProps, "cancelProps">>
  & {
  gridProps?: GridProps;
};