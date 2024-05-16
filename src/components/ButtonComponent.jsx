const ButtonComponent = ({ btnType, btnProps, label }) => {

  function clickFunction() {
    var invstmentOverlay = document.getElementById('investmentOverlay');
    invstmentOverlay.classList.add('ease-out-anim');

    if (!invstmentOverlay.classList.contains('ease-out-anim')) {
      invstmentOverlay.classList.remove('ease-out-anim')
      return;
    }
  
    invstmentOverlay.style.opacity = '0';
  };


  return (
    <button type={btnType} className={`${btnProps}`} onClick={clickFunction}>
        {label}
    </button>
  );
};
export default ButtonComponent;
