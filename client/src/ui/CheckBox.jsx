function CheckBox({ value, onChange, labelText, name }) {
  return (
    <div className="flex items-center gap-5">
      <input
        className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
        type="checkbox"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name} className="font-medium">
        {labelText}
      </label>
    </div>
  );
}

export default CheckBox;
