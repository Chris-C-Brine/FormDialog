// src/components/dialogs/FormDialog/state/FormDialogProvider.tsx
import { useState, type FC, type PropsWithChildren } from "react";
import { FormDialogContext, type  FormDialogContextType} from "./FormDialogContext";

export interface FormDialogProviderProps
  extends PropsWithChildren,
    Partial<Pick<FormDialogContextType, "open" | "closeDialog">> {}

export const FormDialogProvider: FC<FormDialogProviderProps> = ({ children, ...value }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <FormDialogContext.Provider value={{ ...value, disabled, setDisabled }}>
      {children}
    </FormDialogContext.Provider>
  );
};