import { Link } from "react-router-dom";


const ButtonLinkComponent = ({ linkURL, btnBg, btnProps, label }) => {
  return (
    <Link to={linkURL} className={`rounded-lg shadow-lg ${btnProps} ${btnBg ? 'bg-blue-600' : 'bg-red-500'}`}>{label}</Link>
  );
};

export default ButtonLinkComponent;
