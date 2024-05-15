import { investmentPlatform } from "../assets/images";




const HomeSectionFive = () => {
  return (
    <section className="home-section-five">
        <div className="h-container-5 container">
            <div className="lg:flex lg:flex-row">
                <div className="home-section-five--left">
                    <div className="h-investment-wrap">
                        <img src={investmentPlatform} alt="save online Nigeria cowrywise" />
                    </div>
                </div>
                <div className="home-section-five--right">
                    <h2>It only takes 5 minutes</h2>
                    <div className="registration-steps-wrap">

                        {/* First Step */}
                        <div className="step-item">
                            <span className="step-item-count"></span>
                            <div className="step-item-info">
                                <span>Create an account</span>
                                <p>Sign up for an account with your name, email and phone number.</p>
                            </div>
                        </div>
                        {/* First Step */}


                        {/* Second Step */}
                        <div className="step-item">
                            <span className="step-item-count"></span>
                            <div className="step-item-info">
                                <span>Add a payment method</span>
                                <p>Using your debit card or a bank transfer, setup your first plan.</p>
                            </div>
                        </div>
                        {/* Second Step */}


                        {/* Third Step */}
                        <div className="step-item">
                            <span className="step-item-count"></span>
                            <div className="step-item-info">
                                <span>Watch your money grow</span>
                                <p>Sit back, relax & let your money work for you all day, everyday.</p>
                            </div>
                        </div>
                        {/* Third Step */}


                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default HomeSectionFive;
