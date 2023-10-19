import { ReactNode } from "react";
import { FormProps, Form as RouterForm } from "react-router-dom";
import s from "./Form.module.scss";

interface IFormProps extends FormProps {
  children?: ReactNode;
}

const Form = ({ children, ...props }: IFormProps) => {
  return (
    <RouterForm className={s.form} {...props}>
      {children}
    </RouterForm>
  );
};

export default Form;
