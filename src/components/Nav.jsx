import { Link } from "react-router-dom";
import { BrandLogo } from "../assets/images";
import { PersonalFirstIcon, PersonalSecondIcon, PersonalThirdIcon } from "../assets/icons";




const Nav = () => {
    return (
        <>
            <Link className="bg-sky-blue h-14 text-10xl text-center text-light-gray font-medium flex justify-center items-center cursor-pointer" to="https://futureself.cowrywise.com/?utm_source=Landing+page&utm_medium=Web+strip&utm_campaign=futureself&utm_id=FutureSelf" target="_blank">
                Write a letter to your future self 💙 <strong className="text-xl">&nbsp; Click here ↗</strong>
            </Link>
            <header id="header" className="default-header">
                <div className="container">
                    <div className="flex items-center h-full px-0">                
                        <Link className="mt-1.5 mr-20 brand">
                            <BrandLogo />
                        </Link>

                        <div className="flex justify-between w-full">
                            <ul className="nav-links">
                                <li className="menu-item my-4 relative">
                                    <p className="has-dropdown">Personal</p>
                                    <div className="nav-dropdown w-max absolute top-18 bg-white flex pt-12 px-12 pb-10 shadow-sm border border-slate-200 rounded-xl z-50">
                                        <div className="nav-dropdown--left border-e-2 mr-20 pr-20">
                                            <ul>
                                                <Link to="https://cowrywise.com/plan" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <PersonalFirstIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Plan</span>
                                                        <p>Access financial tools & guides</p>
                                                    </div>
                                                </Link>
                                                <Link to="https://cowrywise.com/save" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <PersonalSecondIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Save</span>
                                                        <p>Earn better interests than your bank</p>
                                                    </div>
                                                </Link>
                                                <Link to="https://cowrywise.com/invest" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <PersonalThirdIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Invest</span>
                                                        <p>Build a global portfolio in one app</p>
                                                    </div>
                                                </Link>
                                            </ul>
                                        </div>
                                        <div className="nav-dropdown--right mr-14">
                                            <h6>Growth Tools</h6>
                                            <ul className="nav-dropdown-item">
                                                <li>
                                                    <Link to="https://cowrywise.com/interest-tool">Estimate your interests</Link>
                                                </li>
                                                <li>
                                                    <Link to="https://cowrywise.com/risk-assessment">Know your risk appetite</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
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
        </>
    );
};
export default Nav;
