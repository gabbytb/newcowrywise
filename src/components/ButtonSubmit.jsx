const ButtonSubmit = ({ btnType, btnProps, btnBg, label }) => {

    
    return (
        <button type={btnType} className={`${btnProps} ${btnBg ? 'bg-blue-600' : 'bg-transparent'}`}>
            {label}
        </button>
    );
};


export default ButtonSubmit;