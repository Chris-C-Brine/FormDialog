// src/components/PaperForm.tsx
import { Paper, type PaperProps } from "@mui/material";
import { FormContainer, type FieldValues, type FormContainerProps } from "react-hook-form-mui";

export type PaperFormProps<T extends FieldValues> = PaperProps & {
  formProps: FormContainerProps<T>;
};
export const PaperForm = <T extends FieldValues,>({ children, formProps, ...paperProps }: PaperFormProps<T>) => (
  <Paper {...paperProps}>
    <FormContainer {...formProps}>{children}</FormContainer>
  </Paper>
);
