// src/state/createFormChangeStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { FieldValues } from "react-hook-form";
import {FormStore} from "../types";

const storage = createJSONStorage(() => {
  try {
    return sessionStorage;
  } catch (e) {
    return localStorage;
  }
});

/**
 * Factory function to create a form store with a custom storage name.
 *
 * @param storeName - Unique name for sessionStorage/localStorage key.
 * @returns Zustand store with form data.
 */
export const createFormChangeStore = (storeName: string) =>
  create<FormStore<FieldValues>>()(
    persist(
      (set) => ({
        formData: {},
        updateFormData: (key, value) => {
          return set((state) => ({
            formData: { ...state.formData, [key]: value },
          }));
        },
        resetFormData: (key) => {
          return set((state) => {
            if (key) {
              /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
              const { [key]: _, ...remaining } = state.formData;
              return { formData: remaining };
            }
            return { formData: {} };
          });
        },
      }),
      {
        storage: storage,
        name: storeName, // Key for sessionStorage
      }
    )
  );

export default createFormChangeStore;
