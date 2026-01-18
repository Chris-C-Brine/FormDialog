# @Chris-C-Brine/FormDialog
[![npm version](https://img.shields.io/npm/v/@chris-c-brine/form-dialog.svg)](https://www.npmjs.com/package/@chris-c-brine/form-dialog)
[![License: AAL](https://img.shields.io/badge/License-AAL-blue.svg)](https://github.com/Chris-C-Brine/form-dialog/blob/main/LICENSE)

Easy Form Dialogs!

A React component library that seamlessly integrates Material UI dialogs with React Hook Form, providing context-aware components and simplified dialog management.

## Installation

```bash 
  npm install @chris-c-brine/form-dialog
```

## Dependencies
This package has the following peer dependencies that need to be installed in your project:
- @emotion/react: ^11.0.0
- @emotion/styled: ^11.0.0
- @mui/icons-material: ^7.0.0
- @mui/material: ^7.0.0
- react: ^19.0.0
- react-dom: ^19.0.0
- react-hook-form: ^7.0.0
- react-hook-form-mui: ^7.0.0 || ^8.0.0

## Features

- **Integrated Form Dialogs**: Combines Material UI dialogs with React Hook Form
- **Simplified Workflow**: Streamlined API for common form dialog patterns
- **Context-Aware Components**: Dialog components that share form state
- **TypeScript Support**: Fully typed for a better developer experience
- **Customizable UI**: Extends Material UI components

## Usage Example

### Basic Form Dialog

This example shows how to create a simple login dialog using `FormDialog` and `useDialog`.

```tsx
import { Button, TextField } from "@mui/material";
import { 
  FormDialog, 
  FormDialogActions, 
  useDialog 
} from "@chris-c-brine/form-dialog";
import { TextFieldElement, type SubmitHandler } from "react-hook-form-mui";

interface LoginFormValues {
  username: string;
}

const SimpleLoginExample = () => {
  const { dialogProps, openDialog } = useDialog();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("Form Data:", data);
    dialogProps.onClose();
  };

  return (
    <>
      <Button variant="contained" onClick={openDialog}>
        Open Login Dialog
      </Button>

      <FormDialog
        {...dialogProps}
        title="Login"
        formProps={{ onSuccess: onSubmit }}
        actions={<FormDialogActions />}
      >
        <TextFieldElement 
          name="username" 
          label="Username" 
          required 
          fullWidth 
          margin="dense" 
        />
      </FormDialog>
    </>
  );
};
```

### Standalone Paper Form

You can also use `PaperForm` for forms that aren't in a dialog but still want the same consistent styling and integrated form handling.

```tsx
import { PaperForm, FormDialogActions } from "@chris-c-brine/form-dialog";
import { TextFieldElement } from "react-hook-form-mui";

const StandaloneForm = () => {
  return (
    <PaperForm
      elevation={3}
      sx={{ p: 4, maxWidth: 400, mx: "auto" }}
      formProps={{
        onSuccess: (data) => console.log(data),
      }}
    >
      <h3>Account Settings</h3>
      <TextFieldElement name="displayName" label="Display Name" fullWidth />
      <FormDialogActions removeCancelButton />
    </PaperForm>
  );
};
```

## License

[AAL](LICENSE) © Christopher C. Brine