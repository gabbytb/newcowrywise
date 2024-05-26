const ButtonComponent = ({ btnType, btnProps, label }) => {

  
  function clickFunction() {
      var invstmentOverlay = document.getElementById('investmentOverlay');
      var investmentP = document.querySelector('.roi-investment p');
      invstmentOverlay.classList.add('ease-out-anim');

      if (!invstmentOverlay.classList.contains('ease-out-anim')) {
          invstmentOverlay.classList.remove('ease-out-anim');
          return;
      };
  
      invstmentOverlay.style.opacity = '0';
      investmentP.style.opacity = "1";
  };
  

  return (
      <button type={btnType} className={`${btnProps}`} onClick={clickFunction}>
          {label}
      </button>
  );
};


export default ButtonComponent;
