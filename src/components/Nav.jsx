import { Link } from "react-router-dom";
import { BrandLogo } from "../assets/images";
import { PersonalFirstIcon, PersonalSecondIcon, PersonalThirdIcon, BusinessFirstIcon, DeveloperFirstIcon, DeveloperSecondIcon, LearnFirstIcon, LearnSecondIcon, LearnThirdIcon, } from "../assets/icons";




const Nav = () => {
    
    return (
        <>
            <Link className="bg-sky-blue h-15 text-10xl text-center text-light-gray font-medium flex justify-center items-center cursor-pointer" to="https://futureself.cowrywise.com/?utm_source=Landing+page&utm_medium=Web+strip&utm_campaign=futureself&utm_id=FutureSelf" target="_blank">
                Write a letter to your future self 💙 <strong className="text-xl">&nbsp; Click here ↗</strong>
            </Link>
            <header id="header" className="default-header">
                <div className="container">
                    <div className="flex items-center h-full px-0 relative ">                
                        <Link className="mt-1.5 ml-2 mr-24 brand">
                            <BrandLogo />
                        </Link>

                        <div className="flex justify-end w-full h-full sm:justify-end lg:justify-between">
                            <ul className="nav-links">
                                <li className="menu-item my-4 relative">
                                    <p className="has-dropdown">Personal</p>
                                    <div className="nav-dropdown w-max absolute top-19 bg-white flex pt-12 px-12 pb-10 shadow-sm border border-slate-200 rounded-xl">
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
                                <li className="menu-item my-4 relative">
                                    <p className="has-dropdown">Business</p>
                                    <div className="nav-dropdown w-max absolute top-19 bg-white flex pt-12 px-12 pb-10 shadow-sm border border-slate-200 rounded-xl">
                                        <div className="nav-dropdown--left mr-20 pr-20">
                                            <ul>
                                                <Link to="https://cowrywise.com/plan" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <BusinessFirstIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Sprout</span>
                                                        <p>Put your business idle cash to work</p>
                                                    </div>
                                                </Link>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="menu-item my-4 relative">
                                    <p className="has-dropdown">Developer</p>
                                    <div className="nav-dropdown w-max absolute top-19 bg-white flex pt-12 px-12 pb-10 shadow-sm border border-slate-200 rounded-xl">
                                        <div className="nav-dropdown--left border-e-2 mr-20 pr-20">
                                            <ul>
                                                <Link to="https://cowrywise.com/plan" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <DeveloperFirstIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Embed</span>
                                                        <p>Offer investment services in your app</p>
                                                    </div>
                                                </Link>
                                                <Link to="https://cowrywise.com/save" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <DeveloperSecondIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Docs</span>
                                                        <p>Read how to integrate the Embed API</p>
                                                    </div>
                                                </Link>                                       
                                            </ul>
                                        </div>
                                        <div className="nav-dropdown--right mr-14">
                                            <h6>Connect</h6>
                                            <ul className="nav-dropdown-item">
                                                <li>
                                                    <Link to="https://cowrywise.com/interest-tool">Join Embed on Slack</Link>
                                                </li>                                             
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li className="menu-item my-4 relative">
                                    <p className="has-dropdown">Learn</p>
                                    <div className="nav-dropdown w-max absolute top-19 bg-white flex pt-12 px-12 pb-10 shadow-sm border border-slate-200 rounded-xl">
                                        <div className="nav-dropdown--left mr-20 pr-20">
                                            <ul>
                                                <Link to="https://learn.cowrywise.com" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <LearnFirstIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Glossary</span>
                                                        <p>Learn from a curation of simple money terms</p>
                                                    </div>
                                                </Link>
                                                <Link to="https://cowrywise.com/blog" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <LearnSecondIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Blog</span>
                                                        <p>Announcements, articles and stories</p>
                                                    </div>
                                                </Link>
                                                <Link to="https://help.cowrywise.com" className="nav-dropdown-item flex items-center mb-12 pr-8">
                                                    <LearnThirdIcon />
                                                    <div className="flex flex-col ml-10">
                                                        <span>Help Center</span>
                                                        <p>Everything you need to use Cowrywise</p>
                                                    </div>
                                                </Link>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <div className="cta-menu">
                                <Link to="#">log in</Link>
                                <Link to="#">sign up for free</Link>
                            </div>
                            
                            <div className="mobile-nav">
                                <div className="hamburger">
                                    <span></span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};
export default Nav;
