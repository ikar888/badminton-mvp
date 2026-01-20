const Button01 = ({ onClick, buttonName}) => {
  return (
    <>
    <button
    onClick={onClick}
    className="bg-emerald-900 text-white text-lg py-2 px-4 m-3 hover:bg-emerald-700 disabled:opacity-50 rounded"
    >
      {buttonName}
    </button>
    </>
  )
}

export default Button01