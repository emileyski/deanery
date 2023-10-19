import s from "./Text.module.scss";

interface ITextProps {
  children?: string;
  color?: string;
  fontSize?: string;
}
const Text = ({ color, fontSize, children }: ITextProps) => {
  return (
    <span className={s.text} style={{ color, fontSize }}>
      {children}
    </span>
  );
};

export default Text;
