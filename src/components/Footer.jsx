import { Link } from "react-router-dom";
import { PlayStoreIcon, StarRating } from "../assets/icons";





const Footer = () => {
  return (
    <footer className="mt-8 w-full relative">
        <div className="container-fc container">
            <div className="app-reviews">

                {/* Left Side Element */}
                <div className="app-review--card">
                    <div className="top-review--card">
                        <div className="flex justify-start">
                            <h3>4.5<sub>/5</sub></h3>
                            <StarRating />
                        </div>
                        <Link to="https://cwry.se/app">
                            <PlayStoreIcon />
                        </Link>
                    </div>
                    <div className="bottom-review--card">

                    </div>
                </div>
                {/* Left Side Element */}






                {/* Right Side Element */}
                <div className="app-review--card">
                    
                </div>
                {/* Right Side Element */}

            </div>
        </div>
    </footer>
  );
};

export default Footer;
