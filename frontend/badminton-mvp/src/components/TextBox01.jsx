const TextBox = ({
  className,
  type,
  value,
  onChange,
  placeholderText,
  name,
  required,
  disabled,
}) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholderText}
      name={name}
      required={required}
      disabled={disabled}
    />
  );
};

export default TextBox;
