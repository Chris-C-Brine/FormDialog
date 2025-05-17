# @chris-c-brine/form-dialog

Easy Form Dialogs with a persistable state!

A React component library that seamlessly integrates Material UI dialogs with React Hook Form, providing persistable form state, context-aware components, and simplified dialog management.

## Installation

This package is currently private and intended for restricted access use.

```bash 
npm install @chris-c-brine/form-dialog
```

## Dependencies
This package has the following peer dependencies that need to be installed in your project:
- @emotion/react: ^11.14.0
- @emotion/styled: ^11.14.0
- @mui/icons-material: ^7.1.0
- @mui/material: ^7.1.0
- lodash: ^4.17.21
- react: ^19.1.0
- react-dom: ^19.1.0
- react-hook-form: ^7.56.2
- react-hook-form-mui: ^7.6.0
- zustand: ^5.0.4

## Features

- **Integrated Form Dialogs**: Combines Material UI dialogs with React Hook Form
- **Persistable State**: Store form data across page refreshes using Zustand
- **Simplified Workflow**: Streamlined API for common form dialog patterns
- **Context-Aware Components**: Dialog components that share form state
- **TypeScript Support**: Fully typed for a better developer experience
- **Customizable UI**: Extends Material UI components

## Known Issues

- **Max Attempts & Persistence**: PersistForm does not yet support Max attempts

## Login Form Usage Example

```tsx
// LoginPage.tsx
import { useCallback, type FC, type PropsWithChildren } from "react";
import { Container, IconButton } from "@mui/material";
import { globalErrorAtom, useUser } from "@features";
import { useDialog } from "@chris-c-brine/form-dialog";
import { useForm, type SubmitHandler } from "react-hook-form-mui";
import { LoginDialog } from "./LoginDialog";
import LoginForm from ".//LoginForm";
import { Lock as LockIcon, Person as PersonIcon } from "@mui/icons-material";
import { useSetAtom } from "jotai";

const defaultLoginFormValues = { username: "", password: "" };
type SubmitLogin = SubmitHandler<typeof defaultLoginFormValues>;
const LoginPage: FC = () => {
  const { dialogProps, closeDialog, openDialog } = useDialog();
  const { setUser } = useUser();
  const setError = useSetAtom(globalErrorAtom);

  const formContext = useForm({ defaultValues: defaultLoginFormValues });

  const onSuccess: SubmitLogin = useCallback(
    (data, event) => {
      event?.preventDefault(); // Stop default html form submit
      formContext.reset(); // Reset form
      setUser({ name: data.username, isActive: true }); // Update User (and/or other business logic)
      closeDialog(); // Close Dialog
      setError({
        message: <>Hello {data.username}!</>,
        title: 'Successful Login!',
        severity: "success",
        icon: <PersonIcon sx={{fontSize: 35}} />
      });
    },
    [formContext, setUser, closeDialog, setError],
  );

  return (
    <LoginFormContainer>
      <LoginForm onSuccess={onSuccess}>
        <IconButton color="primary" onClick={openDialog} sx={{ py: 1 }}>
          <LockIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </LoginForm>
      <LoginDialog
        dialogProps={{ ...dialogProps }}
        handleSubmit={onSuccess}
        onClose={closeDialog}
      />
    </LoginFormContainer>
  );
};

export default LoginPage;

const LoginFormContainer: FC<PropsWithChildren> = ({ children }) => (
  <Container
    component="main"
    maxWidth={"xs"}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "85vh",
      overflow: "hidden",
      animation: "fadeIn 1s ease-in-out",
      "@keyframes fadeIn": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    }}
  >
    {children}
  </Container>
);
```
```tsx
// LoginPageConstants.ts
import type { SubmitHandler } from "react-hook-form";

export const defaultLoginFormValues = { username: "", password: "" };
export type LoginForm = typeof defaultLoginFormValues;
export type SubmitLogin = SubmitHandler<LoginForm>;
```
```tsx
// LoginFormBase.tsx
import {TextFieldElement, PasswordElement, type PasswordElementProps, useFormContext} from "react-hook-form-mui";
import { memo, useEffect } from "react";
import { useFormDialog, AutoGrid, type AutoGridProps } from "@chris-c-brine/form-dialog";

/**
 * Login Form
 */
export type NameProp = {
  name?: string;
};

export type LoginFormProps = NameProp & Pick<AutoGridProps, "columnCount">;
const LoginFormBase = memo(function ({ name, columnCount = 1 }: LoginFormProps) {
  const { disabled } = useFormDialog();

  return (
    <AutoGrid
      columnCount={columnCount}
      columnSpacing={2}
      rowSpacing={1}
      components={[
        <UserName key={`${name}-username`} disabled={disabled} />,
        <Password key={`${name}-password`} disabled={disabled} />,
      ]}
    />
  );
});

LoginFormBase.displayName = "LoginForm";

export default LoginFormBase;

/**
 * Inputs
 */
const UserName = ({ disabled }: Pick<PasswordElementProps, "disabled">) => (
  <TextFieldElement
    name="username"
    label="Username"
    required
    autoFocus
    autoComplete="off"
    fullWidth
    margin={"dense"}
    size={"medium"}
    disabled={disabled}
    slotProps={{
      inputLabel: { shrink: true },
    }}
  />
);

const Password = ({ disabled }: Pick<PasswordElementProps, "disabled">) => {
  const { setValue, getValues } = useFormContext();
  const password = getValues("password");

  useEffect(() => {
    if (disabled && password !== "") {
      setValue("passwordDisabled", "");
    }
  }, [disabled, setValue, password]);

  return (
    <PasswordElement
      name={"password"}
      label={"Password"}
      fullWidth
      required
      autoComplete="off"
      size="medium"
      margin={"dense"}
      disabled={disabled}
      slotProps={{
        inputLabel: { shrink: true },
      }}
      {...(disabled && { renderIcon: () => <></> })}
    />
  );
};
```
```tsx
// LoginForm.tsx
import { Lock as LockIcon } from "@mui/icons-material";
import { Box, Typography, type TypographyProps } from "@mui/material";
import { type SubmitLogin, defaultLoginFormValues } from "./LoginPageConstants";
import LoginFormBase from "./LoginFormBase";
import { merge } from "lodash";
import type { FC, PropsWithChildren } from "react";
import { FormDialogActions, FormDialogProvider, PaperForm } from "@chris-c-brine/form-dialog";

const AltIcon = () => <LockIcon sx={{ mr: 1, fontSize: 20 }} />;

interface LoginFormProps extends PropsWithChildren {
  onSuccess: SubmitLogin;
}

const LoginForm: FC<LoginFormProps> = ({ onSuccess, children }) => {
  return (
    <LoginPaperForm onSuccess={onSuccess}>
      <Box px={2}>
        {children}
        <SecureLoginText />
        <LoginFormBase name="page-form" columnCount={1} />
      </Box>
      <FormDialogActions
        removeCancelButton={true}
        gridProps={{ mt:3, mb:1,px:2 }}
        submitProps={{
          altIcon: <AltIcon />,
          children: "Log In",
          maxAttempts: 5,
        }}
      />
    </LoginPaperForm>
  );
};

export default LoginForm;

const SecureLoginText: FC<TypographyProps> = (props) => {
  const typographyProps = merge(
    {
      component: "h1",
      variant: "h5",
      sx: { marginBottom: "20px" },
    },
    props,
  );
  return <Typography {...typographyProps}>Secure Login</Typography>;
};

type LoginPaperFormProps = PropsWithChildren & {
  onSuccess?: SubmitLogin;
};

const LoginPaperForm: FC<LoginPaperFormProps> = ({ children, onSuccess }) => {
  return (
    <FormDialogProvider>
      <PaperForm
        formProps={{
          defaultValues: defaultLoginFormValues,
          onSuccess,
          onError: (e) => console.log(e),
        }}
        elevation={3}
        sx={{
          padding: "20px",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        {children}
      </PaperForm>
    </FormDialogProvider>
  );
};
```
```tsx
// LoginDialog.tsx
import {useDialog, FormDialog, FormDialogActions, type FormDialogProps,  PersistForm } from "@chris-c-brine/form-dialog";
import {  type FC } from "react";
import { useForm } from "react-hook-form-mui";
import LoginFormBase from "./LoginFormBase";
import {
  defaultLoginFormValues,
  type LoginForm,
  type SubmitLogin,
} from "./LoginPageConstants";

const formKey = "dialog-login-form";

/* Basic Form Dialog Test */
type LoginDialogProps = Pick<ReturnType<typeof useDialog>, "dialogProps"> &
  Pick<FormDialogProps<LoginForm>, "onClose"> & {
    handleSubmit: SubmitLogin;
  };

export const LoginDialog: FC<LoginDialogProps> = ({ dialogProps, handleSubmit }) => {
  const formContext = useForm({ defaultValues: defaultLoginFormValues });

  return (
    <FormDialog
      {...dialogProps}
      formProps={{ onSuccess: handleSubmit, formContext, onError: (e) => console.log(e) }}
      title={"Basic Persist Form Dialog Test"}
      titleProps={{ variant: "h5", textAlign: "center" }}
      actions={<FormDialogActions resetProps={{ formKey }} submitProps={{ maxAttempts: 3 }} />}
    >
      <PersistForm formName={formKey}>
        <LoginFormBase name={formKey} columnCount={2} />
      </PersistForm>
    </FormDialog>
  );
};
```