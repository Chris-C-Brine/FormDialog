import {FieldValues, UseFormStateReturn} from "react-hook-form-mui";

export type DisabledWhileActionProps = {
  formState: UseFormStateReturn<FieldValues>,
  disabledForm: boolean,
}
export const disabledWhileLoading = ({formState, disabledForm}: DisabledWhileActionProps): boolean => {
  return formState.isSubmitting || formState.isLoading || disabledForm;
}

export const enabledWhileDirty = ({formState, disabledForm}: DisabledWhileActionProps): boolean => {
  return !formState.isDirty || disabledWhileLoading({formState, disabledForm})
}
