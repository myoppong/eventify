export default function SelectField({ label, options, error, id, ...registerProps }) {
  const inputId = id || registerProps.name;

  return (
    <div>
      <label htmlFor={inputId} className="block mb-1">{label}</label>
      <select
        id={inputId}
        {...registerProps}
        className="w-full p-2 border rounded"
      >
        <option value="">Select a role</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
