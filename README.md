# @Chris-C-Brine/FormDialog

Easy Form Dialogs with a persistable state!

A React component library that seamlessly integrates Material UI dialogs with React Hook Form, providing persistable form state, context-aware components, and simplified dialog management.

## Installation

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
import { type FC } from "react";
import { Container, IconButton } from "@mui/material";
import { useDialog } from "@chris-c-brine/form-dialog";
import LoginForm from "./components/forms/LoginForm";
import { Lock as LockIcon } from "@mui/icons-material";
import { LoginDialog } from "./LoginDialog";

const LoginPage: FC = () => {
  const { dialogProps, openDialog } = useDialog();

  return (
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
      <LoginForm>
        <IconButton color="primary" onClick={openDialog} sx={{ py: 1 }}>
          <LockIcon sx={{ fontSize: 50 }} />
        </IconButton>
      </LoginForm>
      <LoginDialog dialogProps={dialogProps} />
    </Container>
  );
};

export default LoginPage;
```
```tsx
// LoginPageConstants.ts
import type { SubmitHandler } from "react-hook-form";

export const defaultLoginFormValues = { username: "", password: "" };
export type LoginFormValues = typeof defaultLoginFormValues;
```
```tsx
// LoginFormBase.tsx
import { TextFieldElement, PasswordElement, type PasswordElementProps, useFormContext} from "react-hook-form-mui";
import { memo, useEffect } from "react";
import { useFormDialog } from "@chris-c-brine/form-dialog";
import { AutoGrid, type AutoGridProps } from "@chris-c-brine/autogrid";

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
UserName.displayName = "UserName";

const Password = ({ disabled }: Pick<PasswordElementProps, "disabled">) => {
  const { setValue, getValues } = useFormContext();
  const password = getValues("password");

  useEffect(() => {
    if (disabled && password !== "") {
      setValue("disabledPassword", "");
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

Password.displayName = "Password";
```
```tsx
// LoginForm.tsx
import { Lock as LockIcon } from "@mui/icons-material";
import { Box, Typography, type TypographyProps } from "@mui/material";
import { merge } from "lodash";
import { FC, PropsWithChildren, useCallback, useMemo } from "react";
import { FormDialogActions, FormDialogProvider, PaperForm } from "@chris-c-brine/form-dialog";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { defaultLoginFormValues, LoginFormValues } from "./LoginPageConstants";
import LoginFormBase from "./LoginFormBase";
import { globalErrorAtom, useUser } from "@features";
import { useSetAtom } from "jotai/index";
import {  Person as PersonIcon } from "@mui/icons-material";

const AltIcon = () => <LockIcon sx={{ mr: 1, fontSize: 20 }} />;

export const LoginForm: FC<PropsWithChildren> = ({ children }) => {

  return (
    <LoginPaperForm>
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

const LoginPaperForm: FC<PropsWithChildren> = ({ children }) => {
  const formContext = useForm({defaultValues: defaultLoginFormValues});
  const { setUser } = useUser();
  const setError = useSetAtom(globalErrorAtom);
  const reset = useMemo(() => formContext.reset, [formContext?.reset]);

  const onSuccess: SubmitHandler<LoginFormValues> = useCallback(
    (data, event) => {
      event?.preventDefault(); // Stop default html form submit
      event?.stopPropagation(); // STOP!!!!!

      setUser({ name: data.username, isActive: true }); // Update User (and/or other business logic)
      reset(); // reset form
      setError({ // Signal Success!
        message: <>Hello {data.username}!</>,
        title: "Successful Login!",
        severity: "success",
        icon: <PersonIcon sx={{ fontSize: 35 }} />,
      });
    }, [setUser, setError, reset]);

  return (
    <FormDialogProvider>
      <PaperForm
        persistKey={'login-page-form'}
        formProps={{
          formContext,
          onSuccess,
          onError: (errors, event) => {
            event?.preventDefault();
            console.log(errors)
          },
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
import { useDialog, FormDialog, FormDialogActions } from "@chris-c-brine/form-dialog";
import { memo, useCallback, useMemo } from "react";
import LoginFormBase from "./LoginFormBase";
import { defaultLoginFormValues, LoginFormValues } from "./LoginPageConstants";
import { SubmitHandler, useForm } from "react-hook-form-mui";
import { globalErrorAtom, useUser } from "@features";
import { useSetAtom } from "jotai/index";
import { Person as PersonIcon } from "@mui/icons-material";

const formKey = "dialog-login-form";

export type LoginDialogProps = {
  dialogProps: ReturnType<typeof useDialog>["dialogProps"];
};

export const LoginDialog = memo(function ({ dialogProps }: LoginDialogProps) {
  const setError = useSetAtom(globalErrorAtom);
  const { setUser } = useUser();
  const formContext = useForm({ defaultValues: defaultLoginFormValues });

  const reset = useMemo(() => formContext.reset, [formContext?.reset]);

  const onSuccess: SubmitHandler<LoginFormValues> = useCallback(
    (data, event) => {
      event?.preventDefault();
      event?.stopPropagation();

      console.log(event);
      setUser({ name: data.username, isActive: true }); // Update User (and/or other business logic)
      reset(); // reset form
      setError({
        // Signal Success!
        message: <>Hello {data.username}!</>,
        title: "Successful Login!",
        severity: "success",
        icon: <PersonIcon sx={{ fontSize: 35 }} />,
      });
      dialogProps?.onClose();
    },
    [setUser, setError, dialogProps, reset],
  );

  return (
    <FormDialog
      {...dialogProps}
      persistKey={formKey}
      formProps={{ onSuccess, formContext }}
      title={"Basic Persist Form Dialog Test"}
      titleProps={{ variant: "h5", textAlign: "center" }}
      actions={<FormDialogActions resetProps={{ formKey }} submitProps={{ maxAttempts: 3 }} />}
    >
      <LoginFormBase columnCount={2} />
    </FormDialog>
  );
});

LoginDialog.displayName = "LoginDialog";


```

## License

[ISC](LICENSE) © Christopher Brine