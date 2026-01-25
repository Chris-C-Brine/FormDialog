import {Fragment, ReactNode} from "react";
import {Close as CloseIcon, Refresh as RefreshIcon, Save as SaveIcon} from "@mui/icons-material";

import {ApplyDefaultFormDialogPropsProps, FormButtonProps} from "../types";

export function applyDefaultFormDialogProps(
  {resetProps, submitProps, gridProps, cancelProps, variant = "iconText"}: ApplyDefaultFormDialogPropsProps
) {

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
    ...(resetChildren ? {children: resetChildren} : {}),
    ...resetProps,
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
  let submitChildren: Partial<FormButtonProps> = {};
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