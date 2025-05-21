import type {
  ButtonProps,
  DialogActionsProps,
  DialogContentProps,
  DialogProps,
  DialogTitleProps,
  GridProps,
  PaperProps
} from "@mui/material";
import {type Dispatch, MouseEvent, PropsWithChildren, ReactNode, type SetStateAction} from "react";
import {FieldValues, type FormContainerProps, UseFormReturn} from "react-hook-form-mui";
import type {FieldValue} from "react-hook-form";

/**
 * Props for the FormCancelButton component
 */
export type FormCancelButtonProps = Omit<ButtonProps, "onClick"> & {
  /** Whether to maintain any attempt counters when canceling */
  keepCount?: boolean;
};

/**
 * Props for the FormResetButton component
 */
export type FormResetButtonProps = Omit<ButtonProps, "onClick"> & {
  /**
   * Whether to preserve the submission count when resetting the form
   * When true, the form's submitCount will be maintained after reset
   */
  keepCount?: boolean;

  /**
   * A unique identifier for the form associated with this reset button
   * When provided, also clears persisted form data from storage
   */
  formKey?: string;
};

/**
 * Props for the FormSubmitButton component
 */
export type FormSubmitButtonProps = Omit<LoadingButtonProps, "onClick"> & {
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

  /**
   * Optional icon to display when the button is not in loading state
   * Can be used to provide a visual indicator of the button's action
   */
  altIcon?: ReactNode;
};

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

  /**
   * Optional key to use for form state persistence
   * When provided, the form state will be persisted in
   * session storage with a fallback to local storage (TODO: make configurable)
   * and restored on form reload/mount.
   */
  persistKey?: string;
};

/**
 * Props for the PaperForm component
 */
export type PaperFormProps<T extends FieldValues> = PaperProps & CommonFormProps<T>;

/**
 * Props for the PersistForm component
 */
export interface PersistFormProps extends PropsWithChildren {
  /**
   * A unique identifier for the form
   * This key is used to store and retrieve form data in the persistence layer
   */
  formName: string
}

/**
 * Props for the AutoGrid component
 */
export type AutoGridProps = Omit<GridProps, "container" | "children"> & {
  /**
   * Array of React components to be arranged in the grid
   */
  components?: ReactNode[];
  /**
   * Number of columns to display (maximum 12 due to MUI Grid system)
   * @default 1
   */
  columnCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /**
   * Alternative to columnCount, specifies the exact column widths (total must sum to 12)
   *
   * @default undefined
   * @example
   * // 3 columns
   * columnWidths: [4, 4, 4]
   * // 2 columns
   * columnWidths: [4, 8]
   * // 1 column
   * columnWidths: [12] | columnCount: 1 | leave both blank
   */
  columnWidths?: number[] // e.g., [6, 3, 3] (must sum to 12)
};

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

export type PersistedFormProviderProps<T extends FieldValues> = {
  /**
   * A unique key for the form
   */
  formName: string | undefined;

  /**
   * Represents the context of a form, which is used to manage the state and actions of the form.
   * The context is typically provided by a form management library and used to handle form inputs,
   * validation, and submission.
   */
  formContext: UseFormReturn<T, any, T> | UseFormReturn<T> | undefined;
}

export interface FormStore<T extends FieldValues> {
  formData: Partial<Record<keyof T, FieldValue<T>>>; // Keys from `T`
  updateFormData: <K extends keyof T>(key: K, value: FieldValue<T>) => void; // Enforces `key` exists in `T`
  resetFormData: (key?: keyof T) => void;
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