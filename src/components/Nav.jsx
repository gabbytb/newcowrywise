import { Link } from "react-router-dom";
import { BrandLogo } from "../assets/images";




const Nav = () => {
    return (
        <header>
            <div className="max-container px-7 h-full w-full my-0 mx-auto">
                <div className="flex items-center h-full px-0">                
                    <Link className="mt-1.5 mr-20 brand">
                        <BrandLogo />
                    </Link>

                    <div className="flex justify-between w-full">
                        <ul className="justify-start space-x-16 nav-links">
                            <li className="menu-item my-4">
                                <p>Personal</p>
                            </li>
                            <li className="menu-item my-4">
                                <p>Business</p>
                            </li>
                            <li className="menu-item my-4">
                                <p>Developer</p>
                            </li>
                            <li className="menu-item my-4">
                                <p>Learn</p>
                            </li>
                        </ul>

                        <div className="items-center justify-end space-x-10 cta-menu">
                            <Link to="#">log in</Link>
                            <Link to="#">sign up for free</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Nav;
