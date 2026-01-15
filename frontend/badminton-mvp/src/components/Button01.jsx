const Button01 = ({ onClick, buttonName}) => {
  return (
    <>
    <button
    onClick={onClick}
    className="bg-emerald-600 text-white text-lg py-2 px-4 m-3 hover:not-focus:bg-green-700 cursor-pointer rounded-[10px] "
    >
      {buttonName}
    </button>
    </>
  )
}

export default Button01