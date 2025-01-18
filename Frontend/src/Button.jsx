function Button(props) {
  return (
    <button
      className="bg-white border border-black py-1 px-2 rounded cursor-pointer"
      type="button"
      onCLick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
