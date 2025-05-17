import {Fragment, ReactNode} from "react";
import {FormDialogActionsProps, FormSubmitButtonProps} from "../components";
import {GridProps} from "@mui/material";
import {Close as CloseIcon, Refresh as RefreshIcon, Save as SaveIcon} from "@mui/icons-material";
import {omit} from "lodash";

type ApplyDefaultFormDialogPropsProps = Pick<
  FormDialogActionsProps,
  "resetProps" | "submitProps" | "variant"
> & Partial<Pick<FormDialogActionsProps, "cancelProps">>
  & {
  gridProps?: GridProps;
};

export function applyDefaultFormDialogProps(
  {resetProps, submitProps, gridProps, cancelProps, variant = "iconText"}: ApplyDefaultFormDialogPropsProps
) {
  // Max Attempts
  const maxAttempts = submitProps?.maxAttempts || Infinity;
  const hasMaxAttempts = isFinite(maxAttempts) && maxAttempts > 0;

  // Grid Container
  const gridContainerProps = {
    justifyContent: "space-between",
    minWidth: 275,
    px: 1,
    pb: 1.5,
    columnGap: 1,
    width: "100%",
    ...gridProps,
  };

  // Reset Button
  let resetChildren: ReactNode | undefined = undefined;
  if (variant == "icon") resetChildren = <RefreshIcon/>;
  if (variant == "iconText")
    resetChildren = (
      <Fragment key="refreshIconText">
        <RefreshIcon sx={{mr: 1}}/> RESET
      </Fragment>
    );
  const resetButtonProps = {
    keepCount: hasMaxAttempts,
    ...(resetChildren ? {children: resetChildren} : {}),
    ...omit(resetProps, "disabled"),
  };

  // Cancel Button
  let cancelChildren: ReactNode | undefined = undefined;
  if (variant == "icon") cancelChildren = <CloseIcon/>;
  if (variant == "iconText")
    cancelChildren = (
      <Fragment key="cancelIconText">
        <CloseIcon sx={{mr: 1}}/> CANCEL
      </Fragment>
    );
  const cancelButtonProps = {
    ...(cancelChildren ? {children: cancelChildren} : {}),
    ...cancelProps,
  };

  // Submit Button
  let submitChildren: Partial<FormSubmitButtonProps> = {};
  if (variant == "icon")
    submitChildren = {children: <></>, altIcon: <SaveIcon/>};
  if (variant == "iconText")
    submitChildren = {altIcon: <SaveIcon sx={{mr: 1}}/>};
  const submitButtonProps = {
    ...submitChildren,
    ...submitProps,
  };

  return {resetButtonProps, gridContainerProps, cancelButtonProps, submitButtonProps};
}