import { ReactNode } from "react";
import s from "./FormContainer.module.scss";

interface IFormContainerProps {
  children: ReactNode;
}
const FormContainer = ({ children }: IFormContainerProps) => {
  return <div className={s.container}>{children}</div>;
};

export default FormContainer;
