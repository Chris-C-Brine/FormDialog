import {useFormContext, useFormState} from "react-hook-form-mui";
import {useFormDialog} from "./useFormDialog";

export const useFormButton = () => {
  const formState = useFormState();
  const dialogState = useFormDialog();
  const formContext = useFormContext();
  return {
    formState,
    dialogState,
    formContext,
  }
}