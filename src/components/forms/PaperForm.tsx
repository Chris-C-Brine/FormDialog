// src/components/PaperForm.tsx
import { Paper } from "@mui/material";
import { FormContainer, type FieldValues } from "react-hook-form-mui";
import {PaperFormProps} from "../../types";

/**
 * A component that combines a Material UI Paper with a form container
 *
 * PaperForm wraps form content in an elevated paper surface, providing
 * visual distinction and a clean container for form elements. It integrates
 * seamlessly with react-hook-form by using FormContainer internally.
 *
 * This component is useful for creating standalone form surfaces outside of dialogs,
 * such as on pages or within cards. It supports all Paper props for styling
 * while handling form state management through FormContainer.
 *
 * @example
 * // Basic usage
 * <PaperForm
 *   formProps={{
 *     defaultValues: { name: "", email: "" },
 *     onSuccess: handleSubmit
 *   }}
 *   elevation={3}
 * >
 *   <TextFieldElement name="name" label="Name" />
 *   <TextFieldElement name="email" label="Email" />
 *   <Button type="submit">Submit</Button>
 * </PaperForm>
 *
 * @example
 * // With custom styling and validation
 * <PaperForm
 *   formProps={{
 *     defaultValues: formDefaultValues,
 *     onSuccess: handleSubmit,
 *     onError: handleError,
 *   }}
 *   sx={{
 *     padding: 3,
 *     borderRadius: 2,
 *     backgroundColor: 'background.paper',
 *   }}
 *   elevation={2}
 * >
 *   <FormFields />
 *   <FormDialogActions submitProps={{ children: "Save Profile" }} />
 * </PaperForm>
 *
 * @template T - The type of form values being handled
 */
export const PaperForm = <T extends FieldValues>({ children, formProps, ...paperProps }: PaperFormProps<T>) => (
  <Paper {...paperProps}>
    <FormContainer {...formProps}>
      {children}
    </FormContainer>
  </Paper>
);
