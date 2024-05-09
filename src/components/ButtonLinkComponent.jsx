import { Link } from "react-router-dom";


const ButtonLinkComponent = ({ linkURL, label }) => {
  return (
    <Link to={linkURL}>{label}</Link>
  );
};

export default ButtonLinkComponent;
