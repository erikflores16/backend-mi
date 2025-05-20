function Button({ value, type = "submit" }) {
  return (
    <button type={type} className="login-button">
      {value}
    </button>
  );
}

export default Button;
