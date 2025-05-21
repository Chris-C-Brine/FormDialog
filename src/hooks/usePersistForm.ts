// src/state/FormStoreProvider.tsx
import {useEffect} from "react";
import {FieldValues, Path, UseFormReturn} from "react-hook-form-mui";
import createFormChangeStore from "../state/createFormChangeStore";
import {debounce, isEmpty} from "lodash";
import {useFormDialog} from "./useFormDialog";
import {deepCompare} from "../utils";
import {useOnMount} from "./useOnMount";
import {PersistedFormProviderProps} from "../types";

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
 */
export const usePersistForm = <T extends FieldValues>({
  formName = "",
  formContext
}: PersistedFormProviderProps<T>) => {

  // const { setValue, watch, formState } = formContext;
  const {formData, updateFormData, resetFormData} = createFormChangeStore(formName)();
  const {disabled} = useFormDialog();

  const debouncedUpdate = debounce((key, values) => {
    updateFormData(key, values);
  }, 200);

  useEffect(() => {
    if (!formName || !formContext) return;

    const {watch, formState} = formContext;

    const subscription = watch((newValues, {name}) => {
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
  }, [formContext, debouncedUpdate]);

  useOnMount(() => {
    if (!isEmpty(formData) && !disabled && !formContext?.formState.isLoading && formName) {

      setTimeout(() => {
        Object.entries(formData).forEach(([key, value]) => {
          formContext?.setValue(key as Path<T>, value, {shouldDirty: true, shouldTouch: true});
        });
      }, 200);
    }
  });
};
