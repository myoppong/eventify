const Toggle = ({ label, checked, onChange }) => (
    <div className="flex items-center gap-3">
      <span>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
            checked ? "translate-x-6" : ""
          }`}
        ></div>
      </button>
    </div>
  );
  