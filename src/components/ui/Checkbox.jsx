const Checkbox = ({ label, ...props }) => (
    <label className="inline-flex items-center gap-2">
      <input type="checkbox" className="form-checkbox text-blue-600" {...props} />
      <span>{label}</span>
    </label>
  );
  