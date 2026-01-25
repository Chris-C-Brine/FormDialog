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
 * Props for the Form Buttons
 */
export type FormButtonProps = LoadingButtonProps & {
  /**
   * Display variant for the button, determining whether to show icon, text, or both.
   * Inherited from FormDialogActionsProps.
   */
  iconVariant?: FormDialogActionsProps['variant']
};

/**
 * Props for the LoadingButton component
 */
export type LoadingButtonProps = ButtonProps & {
  /**
   * Controls the loading state of the button
   * When true, displays a loading spinner; when false or undefined, displays normal content
   */
  loading?: boolean;

  /**
   * Properties to configure the appearance and behavior of a circular progress indicator.
   * This variable allows customization of a loading icon using the attributes defined in `CircularProgressProps`.
   * It can be used to control the size, color, and additional settings of the circular progress component.
   *
   * @type {CircularProgressProps | undefined}
   */
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
  cancelProps?: FormButtonProps;

  /**
   * Props to customize the reset button
   */
  resetProps?: FormButtonProps;

  /**
   * Props to customize the "submit button"
   */
  submitProps?: FormButtonProps;

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