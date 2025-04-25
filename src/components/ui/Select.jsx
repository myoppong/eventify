export default function SelectField({ label, options, error, ...registerProps }) {
  console.log("SelectField registerProps:", registerProps);

  return (
    <div>
      <label className="block mb-1">{label}</label>
      <select {...registerProps} className="w-full p-2 border rounded">
        <option value="">Select a role</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
