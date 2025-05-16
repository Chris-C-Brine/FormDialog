// src/state/FormStoreProvider.tsx
import { useEffect } from "react";
import { useFormContext } from "react-hook-form-mui";
import createFormChangeStore from "../state/createFormChangeStore";
import { debounce, isEmpty } from "lodash";
import { useFormDialog } from "./useFormDialog";
import { deepCompare } from "../utils";
import { useOnMount } from "./useOnMount";


export interface PersistedFormProviderProps {
  /**
   * A unique key for the form
   */
  formName: string | undefined;
}

/**
 * Hook that enables form state persistence across sessions
 *
 * This hook connects a form to persistent storage (e.g., sessionStorage)
 * allowing form values to be preserved when navigating away and returning.
 * It works by watching form changes and syncing with a zustand store.
 *
 * Key features:
 * - Persists form values during navigation or page reloads
 * - Automatically restores saved values when form is rendered
 * - Debounced updates to avoid excessive storage operations
 * - Only saves changed fields, not the entire form state
 * - Automatically clears storage when form values match defaults
 *
 * @example
 * // In a form component:
 * const MyPersistedForm = () => {
 *   const formMethods = useForm({ defaultValues: { name: '' } });
 *   // Connect the form to persistence
 *   usePersistedForm({ formName: 'user-registration' });
 *
 *   return (<FormProvider {...formMethods}>
 *     <TextFieldElement name="name" label="Name" />
 *   </FormProvider>);
 * }
 *
 * @example
 * // For convenience, use with the PersistForm wrapper component:
 * <PersistForm formName="user-profile">
 *   <ProfileFormFields />
 * </PersistForm>
 *
 * @param props - Configuration options
 */
export const usePersistedForm = ({ formName = "" }: PersistedFormProviderProps) => {
  const { setValue, watch, formState } = useFormContext();
  const { formData, updateFormData, resetFormData } = createFormChangeStore(formName)();
  const { open, disabled } = useFormDialog();

  const debouncedUpdate = debounce((key, values) => {
    updateFormData(key, values);
  }, 200);

  useEffect(() => {
    if (!formName) return;
    
    const subscription = watch((newValues, { name }) => {
      if (deepCompare(newValues, formState.defaultValues, true)) {
        resetFormData();
      } else if (name) {
        const newValue = newValues[name];
        const currentValue = formData[name];

        // Allow clearing fields
        if (currentValue !== newValue) {
          debouncedUpdate(name, newValue);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      debouncedUpdate.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, debouncedUpdate]);

  useOnMount(() => {
    if (!isEmpty(formData) && !disabled && !formState.isLoading && open && formName) {

      setTimeout(() => {
        Object.entries(formData).forEach(([key, value]) => {
          setValue(key, value, { shouldDirty: true, shouldTouch: true });
        });
      }, 200);
    }
  });
};