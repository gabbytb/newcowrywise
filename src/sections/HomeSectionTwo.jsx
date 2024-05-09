import { ButtonLinkComponent, GraphComponent } from "../components"


const HomeSectionTwo = () => {

  return (
    <section className="home-section-two">
        <div className="h-container-2 max-container">
            <div className="flex justify-between">


                {/* Left Side */}
                <div className="home-section-two--left">
                  <div className="flex flex-col pt-5 space-y-12 flex-wrap">
                      <h2>
                        Get a <span>little</span>&nbsp;richer each day
                      </h2>
                      <h5>One small step today, a giant leap for tomorrow.</h5>
                      <ButtonLinkComponent linkURL="https://cowrywise.com/choose-account" label="Start your financial journey" />
                  </div>
                </div>
                {/* Left Side */}




                {/* Right Side */}
                <div className="home-section-two--right">
                    <div id="graph-anim-wrap">
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
