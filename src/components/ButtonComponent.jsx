const ButtonComponent = ({ btnType, btnProps, label }) => {
  return (
    <button type={btnType} className={`${btnProps}`}>
        {label}
    </button>
  );
};
export default ButtonComponent;
