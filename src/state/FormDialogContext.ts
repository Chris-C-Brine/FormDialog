import { createContext } from "react";
import {FormDialogContextType} from "../types";

export const FormDialogContext = createContext<FormDialogContextType | undefined>(undefined);

FormDialogContext.displayName = "FormDialogContext";
