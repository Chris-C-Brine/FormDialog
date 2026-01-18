import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form-mui";
import { useFormDialog } from "./useFormDialog";
import { hasMaxAttempts } from "../utils";
import { merge } from "lodash";
import {UseMaxAttemptProps} from "../types";


/**
 * Hook that monitors form submission attempts and disables the form when a limit is reached.
 *
 * It performs two main functions:
 * 1. Monitors `formState.submitCount` and calls `setDisabled(true)` from the dialog context
 *    once it reaches or exceeds the specified `maxAttempts`.
 * 2. When the dialog context enters a `disabled` state, it automatically resets form fields
 *    that have errors or are dirty to ensure a clean state for the user.
 *
 * @param props - UseMaxAttemptProps
 */
export const useMaxAttempts = ({ maxAttempts }: UseMaxAttemptProps) => {
  const { formState, resetField } = useFormContext();
  const { setDisabled, disabled } = useFormDialog();
  const hasRun = useRef(false);

  // Reset & disable the form when the count exceeds the maxAttempts
  useEffect(() => {
    if (hasMaxAttempts(maxAttempts) && formState.submitCount >= maxAttempts && !hasRun.current ) {
      setDisabled(true);
      hasRun.current = true;
    }
  }, [formState.submitCount, maxAttempts, setDisabled]);

  // Debugging & disabled form field reset
  useEffect(() => {
    if (disabled) {
      Object.keys(merge(formState.dirtyFields, formState.errors)).forEach((i) => {
        resetField(i, { keepTouched: true });
      });
    }
  }, [disabled, formState, maxAttempts, resetField]);
};
