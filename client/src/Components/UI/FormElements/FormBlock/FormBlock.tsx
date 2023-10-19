import { ReactNode } from "react";
import s from "./FormBlock.module.scss";
interface IFormBlockProps {
  children?: ReactNode;
}
const FormBlock = ({ children }: IFormBlockProps) => {
  return <div className={s.container}>{children}</div>;
};

export default FormBlock;
