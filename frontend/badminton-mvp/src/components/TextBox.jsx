const TextBox = ({ className, type, value, onChange, placeholderText }) => {
  return (
    <>
    <input
    className={className}
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholderText}
    > 
    </input>
    </>
  )

}

export default TextBox