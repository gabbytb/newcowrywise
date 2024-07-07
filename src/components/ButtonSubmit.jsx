const ButtonSubmit = ({ btnType, btnProps, btnBg, label, }) => {

    return (
        <button type={btnType} className={`${btnProps} ${btnBg ? 'bg-white' : 'bg-transparent'}`}>
            {label}
        </button>
    );
};


export default ButtonSubmit;