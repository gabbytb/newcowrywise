const ButtonComponent = ({ btnType, label }) => {
  return (
    <button type={btnType}>
        {label}
    </button>
  );
};
export default ButtonComponent;
