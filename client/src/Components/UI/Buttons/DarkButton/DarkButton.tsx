import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./DarkButton.module.scss";

interface IDarkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
const DarkButton = ({ children, ...props }: IDarkButtonProps) => {
  return (
    <button className={s.button} {...props}>
      {children}
    </button>
  );
};

export default DarkButton;
