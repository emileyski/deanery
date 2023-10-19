import { InputHTMLAttributes } from "react";
import s from "./Input.module.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: IInputProps) => {
  return <input type="text" className={s.input} {...props} />;
};

export default Input;
