// src/components/dialogs/FormDialog/state/FormDialogProvider.tsx
import {useState, type FC, type PropsWithChildren} from "react";
import {FormDialogContext, type  FormDialogContextType} from "./FormDialogContext";
import {ThemeBridge} from '../utils/ThemeBridge';

/**
 * Props for the FormDialogProvider component
 *
 * Extends React's PropsWithChildren and allows optional passing of dialog state
 * (open state and close handler) directly to the provider.
 */
export interface FormDialogProviderProps extends PropsWithChildren, Partial<Pick<FormDialogContextType, "open" | "closeDialog">> {
}

/**
 * Context provider component for form dialog state management
 *
 * FormDialogProvider creates and manages shared state for form dialogs,
 * allowing child components to access dialog state and controls through
 * the useFormDialog hook.
 *
 * This provider handles:
 * - Dialog open/close state
 * - Form-wide disabled state
 * - Dialog close handler passing
 * - Theme consistency via ThemeBridge
 *
 * Use this provider to wrap form components that need to share state
 * and disabled status, such as dialogs with multiple form fields
 * and action buttons that need to be coordinated.
 *
 * @example
 * // Basic usage wrapping a form
 * <FormDialogProvider>
 *   <FormContainer onSuccess={handleSubmit}>
 *     <TextFieldElement name="name" />
 *     <FormDialogActions />
 *   </FormContainer>
 * </FormDialogProvider>
 *
 * @example
 * // With pre-configured dialog state
 * <FormDialogProvider open={isOpen} closeDialog={handleClose}>
 *   <PaperForm formProps={formProps}>
 *     <LoginFormFields />
 *     <FormDialogActions submitProps={{ maxAttempts: 3 }} />
 *   </PaperForm>
 * </FormDialogProvider>
 */
export const FormDialogProvider: FC<FormDialogProviderProps> = ({children, ...value}) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <ThemeBridge>
      <FormDialogContext.Provider value={{...value, disabled, setDisabled}}>
        {children}
      </FormDialogContext.Provider>
    </ThemeBridge>
  );
};