const Input = ({ label, ...props }) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium">{label}</label>}
        <input
          className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          {...props}
        />
      </div>
    );
  };
  
  export default Input;
  