import { useEffect } from "react";
import { ButtonLinkComponent, GraphComponent } from "../components"






const HomeSectionTwo = () => {


  useEffect(() => {
    function myFunction() {
        document.querySelector('.home-section-two--left h2').classList.add('s-2-l2-anim');
        document.querySelector('.home-section-two--left h2 span').classList.add('s-2-ls-anim');
        document.querySelector('.home-section-two--left h5').classList.add('s-2-l5-animreverse');

        
        document.querySelector('.home-section-two--right svg').classList.add('animate-slideUp');
        

        setTimeout(() => {
          document.querySelector('.card-item-one').classList.add('s-2-rc-1');
        }, 0);
        
        setTimeout(() => {
          document.querySelector('.card-item-two').classList.add('s-2-rc-2');
        }, 180);
        
        setTimeout(() => {
          document.querySelector('.card-item-three').classList.add('s-2-rc-3');
        }, 220);
    };

    myFunction();        
  }, []);


  return (
    <section className="home-section-two">
        <div className="h-container-2 container">
            <div className="grid grid-cols-18 gap-16 px-10 min-h-138">


                {/* Left Side */}
                <div className="home-section-two--left">
                  <div className="flex flex-col pt-5 xs:space-y-12 sm:space-y-16 lg:space-y-12 w-136">
                      <h2>Get a <span>little</span>&nbsp; richer each day</h2>
                      <h5>One small step today, a giant leap for tomorrow.</h5>
                      <ButtonLinkComponent linkURL="https://cowrywise.com/choose-account" label="Start your financial journey" />
                  </div>
                </div>
                {/* Left Side */}




                {/* Right Side */}
                <div className="home-section-two--right">
                    <div id="bar-anima--wrap">
                      <GraphComponent />
                    </div>

                    <div className="card-item-one card-wrap">
                      <div className="card-item">
                        <h6>Build your savings</h6>
                        <p>Consistently automate your savings while setting realistic goals.</p>
                      </div>
                    </div>

                    <div className="card-item-two card-wrap">
                      <div className="card-item">
                        <h6>Invest deliberately</h6>
                        <p>Invest in our diverse range of assets that grow in value over time.</p>
                      </div>
                    </div>

                    <div className="card-item-three card-wrap">
                      <div className="card-item">
                        <h6>Stay rich ✨</h6>
                        <p>Protect your wealth by managing risk, seeking advice and making smart financial decisions.</p>
                      </div>
                    </div>
                </div>
                {/* Right Side */}


            </div>
        </div>
    </section>
  );
};

export default HomeSectionTwo;
