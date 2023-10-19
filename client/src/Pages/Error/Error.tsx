import { Link } from "react-router-dom";
import s from "./Error.module.scss";

const Error = () => {
  return (
    <div className={s.container}>
      <div className={s.number}>404</div>
      <div className={s.message}>This page doesn't seem to exist</div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Error;
