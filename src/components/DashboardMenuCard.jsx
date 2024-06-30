import { Link } from "react-router-dom";




const DashboardMenuCard = ({ linkURI, iconURI, label }) => {
  return (
    <li className="flex">
        <Link to={`#${linkURI}`} className="w-full flex items-center text-white hover:text-slate-300 focus:text-slate-300 gap-6">
            {iconURI} <span className="text-2xl font-bold capitalize text-white hover:text-slate-300">{label}</span>
        </Link>
    </li>
  );
};
export default DashboardMenuCard;