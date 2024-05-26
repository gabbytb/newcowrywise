import { Link } from "react-router-dom";
import { AppStoreIcon, ArrowRight, PlayStoreIcon, StarRating, } from "../assets/icons";
import { footerCompany, footerProduct, footerResources, footerContact, } from "../constants";
import { ButtonComponent, FooterCard, } from "./";





const Footer = () => {
  return (
    <footer className="w-full relative">
        <div className="container-fc container">
            <div className="app-reviews mt-8 mb-40">

                {/* Left Side Element */}
                <div className="app-review--card">

                    {/* top review card */}
                    <div className="top-review--card">
                        <div className="flex justify-start items-center r-star-rating">
                            <h3>4.5<sub>/5</sub></h3>
                            <StarRating />
                        </div>
                        <Link to="https://cwry.se/app">
                            <PlayStoreIcon />
                        </Link>
                    </div>
                    {/* top review card */}


                    {/* bottom review card */}
                    <div className="flex flex-col bottom-review--card">
                        <h6>Available on the Play Store</h6>
                        <p>“I was able to achieve my one year goal of saving a particular amount of money every month.” - Lilian, May 2023</p>
                        <Link to="https://cwry.se/app">
                            Download now
                            <ArrowRight />
                        </Link>
                    </div>
                    {/* bottom review card */}
                    
                </div>
                {/* Left Side Element */}






                {/* Right Side Element */}
                <div className="app-review--card">

                    {/* top review card */}
                    <div className="top-review--card">
                        <div className="flex justify-start items-center r-star-rating">
                            <h3>4.4<sub>/5</sub></h3>
                            <StarRating />
                        </div>
                        <Link to="https://cwry.se/app">
                            <AppStoreIcon />
                        </Link>
                    </div>
                    {/* top review card */}


                    {/* bottom review card */}
                    <div className="flex flex-col bottom-review--card">
                        <h6>Available on the App Store</h6>
                        <p>“I love the option of being able to lock my money without being able to withdraw it until full term. This is the most important and amazing feature 😍” - Chidiebere, May 2023</p>
                        <Link to="https://cwry.se/app">
                            Download now
                            <ArrowRight />
                        </Link>
                    </div>
                    {/* bottom review card */}

                </div>
                {/* Right Side Element */}

            </div>

            <div className="flex flex-row items-center justify-center rounded-3xl footer-email--wrap">
                <div className="basis-5/12 p-4">
                    <h3 className="text-white font-semibold">Sign up for free.<br/>Start investing today.</h3>
                </div>
                <div className="basis-5/12 p-4">
                    <form className="w-full" action="https://cowrywise.com/choose-account" method="GET">
                        <div className="footer_email">
                            <input className="text--white" type="email" name="email" required="required" placeholder="Your email..." />
                            {/* <input type="hidden" name="utm_source" value="web">
                            <input type="hidden" name="utm_medium" value="button">
                            <input type="hidden" name="utm_campaign" value="web_signup"> */}
                            <ButtonComponent 
                                btnProps="text-black bg-white capitalize h-20 px-12 text-14xl font-semibold shrink-0 rounded-xl absolute top-106 right-106"
                                btnType="submit" 
                                label="Sign up for free" 
                            />
                        </div>
                        {/* <button type="submit" className="">Sign up for free</button> */}
                    </form>
                </div>
            </div>

            <div className="flex flex-row footer-menu--wrap">
                <div className="basis-1/4 p-4">
                    <h4>company</h4>
                    <ul>
                        {
                            footerCompany.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <FooterCard {...item} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="basis-1/4 p-4">
                    <h4>product</h4>
                    <ul>
                        {
                            footerProduct.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <FooterCard {...item} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="basis-1/4 p-4">
                    <h4>resources</h4>
                    <ul>
                        {
                            footerResources.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <FooterCard {...item} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="basis-1/4 p-4">
                    <h4>contact</h4>
                    <ul>
                        {
                            footerContact.map((item) => {
                                return (
                                    <li key={item.label}>
                                        <FooterCard {...item} />
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
