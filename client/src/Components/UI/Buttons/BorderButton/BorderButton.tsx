import { ButtonHTMLAttributes, ReactNode } from "react";
import s from "./BorderButton.module.scss";
interface BorderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const BorderButton = ({ children, ...rest }: BorderButtonProps) => {
  return (
    <button className={s.button} {...rest}>
      {children}
    </button>
  );
};

export default BorderButton;
