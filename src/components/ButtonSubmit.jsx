const ButtonSubmit = ({ btnType, btnProps, btnBg, label }) => {

    
    return (
        <button type={btnType} className={`${btnProps} ${btnBg ? 'bg-blue-600 hover:bg-blue-700 focus:bg-blue-700' : 'bg-transparent'}`}>
            {label}
        </button>
    );
};


export default ButtonSubmit;