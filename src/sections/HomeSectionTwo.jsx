import { useEffect } from "react";
import { ButtonLinkComponent, GraphComponent } from "../components"





const HomeSectionTwo = () => {


  useEffect(() => {
    function myFunction() {
        document.getElementById("sectionTwoAnim").classList.add('s-2-anim');
        document.getElementById("sectionTwoAnime").classList.add('s-2-2-anim');
        document.getElementById("sectionTwoAnimReverse").classList.add('s-2-2-animreverse');
    }

    myFunction();        
  }, []);


  return (
    <section className="home-section-two">
        <div className="h-container-2 container">
            <div className="grid grid-cols-16 gap-44">


                {/* Left Side */}
                <div className="home-section-two--left">
                  <div className="flex flex-col pt-5 space-y-12">
                      <h2 id="sectionTwoAnim">
                        Get a <span id="sectionTwoAnime">little</span>&nbsp;richer each day
                      </h2>
                      <h5 id="sectionTwoAnimReverse">One small step today, a giant leap for tomorrow.</h5>
                      <ButtonLinkComponent linkURL="https://cowrywise.com/choose-account" label="Start your financial journey" />
                  </div>
                </div>
                {/* Left Side */}




                {/* Right Side */}
                <div className="home-section-two--right">
                    <div>
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
