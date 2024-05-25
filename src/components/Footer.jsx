import { Link } from "react-router-dom";
import { AppStoreIcon, ArrowRight, PlayStoreIcon, StarRating } from "../assets/icons";





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

            <div className="flex flex-row justify-center">
                <div className="basis-5/12 p-4">
                    <h3>Sign up for free.<br/>Start investing today.</h3>
                </div>
                <div></div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
