import { createContext } from "react";
import { DialogProps } from "@mui/material";
import type { Dispatch, SetStateAction } from 'react';

export type FormDialogContextType = {
  open?: boolean;
  closeDialog?: DialogProps['onClose'];
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export const FormDialogContext = createContext<FormDialogContextType | undefined>(undefined);

FormDialogContext.displayName = "FormDialogContext";
