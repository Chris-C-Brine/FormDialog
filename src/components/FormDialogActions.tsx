// src/components/FormDialogActions.tsx
import { Grid,  type GridProps } from "@mui/material";
import type {FC, PropsWithChildren, ReactNode} from "react";
import { FormCancelButton, type FormCancelButtonProps } from "./buttons/FormCancelButton";
import { FormResetButton, type FormResetButtonProps } from "./buttons/FormResetButton";
import { FormSubmitButton, FormSubmitButtonProps } from "./buttons/FormSubmitButton";
import { GridSpacer } from "./GridSpacer";
import { Fragment } from "react/jsx-runtime";
import { Close as CloseIcon, Refresh as RefreshIcon, Save as SaveIcon } from "@mui/icons-material";
import { omit } from "lodash";
import { useMaxAttempts } from "../hooks";

export type FormDialogActionsProps = PropsWithChildren & {
    cancelProps?: FormCancelButtonProps;
    resetProps?: FormResetButtonProps;
    submitProps?: FormSubmitButtonProps;
    variant?: "icon" | "text" | "iconText";
};

export const FormDialogActions: FC<FormDialogActionsProps> = ({
  resetProps,
  submitProps,
  cancelProps,
  children,
  variant,
  ...gridProps
}) => {
  // Disable the form when the count exceeds the maxAttempts
  useMaxAttempts({ maxAttempts: submitProps?.maxAttempts || Infinity });

  // Apply default props to the buttons and grid container
  const { gridContainerProps, cancelButtonProps, resetButtonProps, submitButtonProps } =
    ApplyDefaultFormDialogProps({ resetProps, submitProps, cancelProps, gridProps, variant });

  return (
    <Grid container {...gridContainerProps}>
      <Grid>
        <FormCancelButton {...cancelButtonProps} />
      </Grid>
      <Grid>
        <FormResetButton {...resetButtonProps} />
      </Grid>
      {children ?? <GridSpacer />}
      <Grid>
        <FormSubmitButton {...submitButtonProps} />
      </Grid>
    </Grid>
  );
};


type ApplyDefaultFormDialogPropsProps = Pick<
    FormDialogActionsProps,
    "resetProps" | "submitProps" | "variant"
> & Partial<Pick<FormDialogActionsProps, "cancelProps">>
    & {
  gridProps?: GridProps;
};

export function ApplyDefaultFormDialogProps({
  resetProps,
  submitProps,
  gridProps,
  cancelProps,
  variant = "iconText",
}: ApplyDefaultFormDialogPropsProps) {
  const maxAttempts = submitProps?.maxAttempts || Infinity;
  const hasMaxAttempts = isFinite(maxAttempts) && maxAttempts > 0;

  let resetChildren: ReactNode | undefined = undefined;
  if (variant == "icon") resetChildren = <RefreshIcon />;
  if (variant == "iconText")
    resetChildren = (
      <Fragment key="refreshIconText">
        <RefreshIcon sx={{ mr: 1 }} /> RESET
      </Fragment>
    );
  const resetButtonProps = {
    keepCount: hasMaxAttempts,
    ...(resetChildren ? { children: resetChildren } : {}),
    ...omit(resetProps, "disabled"),
  };

  const gridContainerProps = {
    justifyContent: "space-between",
    minWidth: 275,
    px: 1,
    pb: 1.5,
    columnGap: 1,
    width: "100%",
    ...gridProps,
  };

  let cancelChildren: ReactNode | undefined = undefined;
  if (variant == "icon") cancelChildren = <CloseIcon />;
  if (variant == "iconText")
    cancelChildren = (
      <Fragment key="cancelIconText">
        <CloseIcon sx={{ mr: 1 }} /> CANCEL
      </Fragment>
    );
  const cancelButtonProps = {
    ...(cancelChildren ? { children: cancelChildren } : {}),
    ...cancelProps,
  };

  let submitChildren: Partial<FormSubmitButtonProps> = {};
  if (variant == "icon")
    submitChildren = { children: <></>, altIcon: <SaveIcon /> };
  if (variant == "iconText")
    submitChildren = { altIcon: <SaveIcon sx={{ mr: 1 }} /> };
  const submitButtonProps = {
    ...submitChildren,
    ...submitProps,
  };

  return {
    resetButtonProps,
    gridContainerProps,
    cancelButtonProps,
    submitButtonProps,
  };
}