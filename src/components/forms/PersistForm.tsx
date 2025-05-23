import {memo, type PropsWithChildren } from "react";
import { usePersistForm } from "../../hooks";
import {useFormContext} from "react-hook-form-mui";
import {PersistFormProps} from "../../types";



/**
 * A component that enables form state persistence across sessions
 *
 * PersistForm is a lightweight wrapper that connects a form to persistent storage,
 * allowing form values to be preserved when navigating away and returning. It wraps
 * the usePersistedForm hook in a convenient component API.
 *
 * Key features:
 * - Persists form values during navigation or page reloads
 * - Automatically restores saved values when the form is rendered
 * - Only saves changed fields, not the entire form state
 * - Automatically clears storage when form values match defaults
 * - Works with any React Hook Form based forms
 *
 * Note: This component must be used inside a FormProvider from react-hook-form
 * and should be within a FormDialogProvider for full functionality.
 *
 * @example
 * // Basic usage
 * const MyForm = () => {
 *   const methods = useForm({ defaultValues: { name: '' } });
 *
 *   return (<FormProvider {...methods}>
 *     <PersistForm formName="user-profile">
 *       <TextFieldElement name="name" label="Name" />
 *       <FormSubmitButton>Save</FormSubmitButton>
 *     </PersistForm>
 *   </FormProvider>);
 * }
 *
 * @example
 * // Usage within a dialog
 * <FormDialog
 *   formProps={{ defaultValues: defaultValues }}
 *   title="Edit Profile"
 * >
 *   <PersistForm formName="edit-profile-dialog">
 *     <ProfileFormFields />
 *   </PersistForm>
 * </FormDialog>
 */
export const PersistForm = memo(function ({ children, formName }: PersistFormProps) {
  const formContext = useFormContext();
  usePersistForm({ formName, formContext });
  return <>{children}</>;
});

PersistForm.displayName = "PersistForm";