const Button = ({ children, onClick, className, ...props }) => {
    return (
      <button
        className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  