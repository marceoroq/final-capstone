const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  ...props
}) => {
  return (
    <div>
      <label className="mb-2 block font-bold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border p-2 focus:border-[#495E57] focus:outline-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
