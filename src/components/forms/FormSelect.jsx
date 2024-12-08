const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
  ...props
}) => {
  return (
    <div>
      <label className="mb-2 block font-bold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`h-[42px] w-full rounded-lg border p-2 focus:border-[#495E57] focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormSelect;
