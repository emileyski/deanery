import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Button({ children, disabled, to, type = "small", onClick }) {
  const base =
    "inline-block text-sm rounded-full bg-sky-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-sky-300 focus:bg-sky-300 focus:outline-none focus:ring focus:ring-sky-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    base,
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    round: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
    "secondary-small":
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-5 md:py-2.5 text-xs",
    // Добавляем стили для типа small-light
    "small-light":
      "inline-block text-sm rounded-full bg-sky-300 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-sky-200 focus:bg-sky-200 focus:outline-none focus:ring focus:ring-sky-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-5 md:py-2.5 text-xs",
  };

  // Проверяем, если тип точно совпадает с 'small-light'
  const isSmallLight = type === "small-light";
  const buttonType = isSmallLight ? type : type.replace("-light", ""); // Убираем '-light' для других типов кнопок
  const buttonClass = isSmallLight ? styles[buttonType] : styles[buttonType];

  if (to)
    return (
      <Link to={to} className={buttonClass}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClick ? onClick : null}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
}

export default Button;
