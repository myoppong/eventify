const Button = ({ children, variant = "primary", disabled, loading, ...props }) => {
    const baseStyles = "px-4 py-2 rounded font-semibold transition";
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      disabled: "bg-gray-300 text-gray-500 cursor-not-allowed",
      loading: "bg-blue-600 text-white opacity-50 cursor-wait",
    };
  
    const appliedStyles = disabled
      ? variants.disabled
      : loading
      ? variants.loading
      : variants[variant];
  
    return (
      <button className={`${baseStyles} ${appliedStyles}`} disabled={disabled || loading} {...props}>
        {loading ? "Loading..." : children}
      </button>
    );
  };
  
  export default Button;