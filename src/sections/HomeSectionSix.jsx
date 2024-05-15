import { Link } from "react-router-dom";
import { ArrowRight } from "../assets/icons";





const HomeSectionSix = () => {
    
    return (
      <section className="home-section-six">
          <div className="h-container-6 container">

            
            <div className="lg:flex lg:flex-row">
              <div className="w-5/12 home-section-six--left">
                <h2>Keeping your money safe is our business.</h2>
                <p>Trust is our currency. We are committed to the security of your money and the protection of your account.</p>
                <Link to="https://cowrywise.com/security" target="_blank">
                  Learn More <ArrowRight />
                </Link>
              </div>
            </div>


            <div className="lg:flex lg-flex-row">
              <div className="home-section-six--right">
              </div>
            </div>
          </div>
      </section>
    );
};

export default HomeSectionSix;
