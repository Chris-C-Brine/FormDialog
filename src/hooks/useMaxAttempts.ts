import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form-mui";
import { useFormDialog } from "./useFormDialog";
import { hasMaxAttempts } from "../utils";
import { merge } from "lodash";
import {UseMaxAttemptProps} from "../types";


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
