const TextBox = ({ name, className, type, value, onChange, placeholderText }) => {
  return (
    <>
    <input
    name={name}
    className={className}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholderText}
    > 
    </input>
    </>
  )

}

export default TextBox