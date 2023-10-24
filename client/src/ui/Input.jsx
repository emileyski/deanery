function Input({ labelText, type, name, errorText }) {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      <label className="sm:basis-40">{labelText}</label>
      <div className="grow">
        <input
          className="input w-full"
          type={type || "text"}
          name={name}
          required
        />
        {errorText && (
          <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
            {errorText}
          </p>
        )}
      </div>
    </div>
  );
}

export default Input;
