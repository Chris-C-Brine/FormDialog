import type { FC, PropsWithChildren } from "react";
import usePersistedForm from "../hooks/usePersistedForm";

export interface PersistFormProps extends PropsWithChildren {
  formName: string
}
export const PersistForm: FC<PersistFormProps> = ({ children, formName }) => {
  usePersistedForm({ formName });
  return <>{children}</>;
};