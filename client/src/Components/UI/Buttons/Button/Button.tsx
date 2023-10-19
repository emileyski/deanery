import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./Button.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
const Button = ({ children, ...props }: IButtonProps) => {
  return (
    <button className={s.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
