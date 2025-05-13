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

const usePersistedForm = ({ formName = "" }: PersistedFormProviderProps) => {
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

usePersistedForm.displayName = "usePersistedForm";

export default usePersistedForm;
