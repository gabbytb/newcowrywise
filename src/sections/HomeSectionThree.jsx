import { ArrowDown } from "../components";




const HomeSectionThree = () => {
    return (
        <section className="home-section-three">
            <div className="h-container-3 container">


                <div className="content">
                    <h2>Stay the course, reap the rewards</h2>
                    <div className="roi-wrap">
                        <h6>If you invested</h6>
                        <div className="roi-input">
                            <sup>₦</sup>
                            <input type="tel" value="100,000" />
                        </div>
                        <div className="roi-dropdown-wrap">
                            <div className="wrap-selection">
                                <select className="roi--select-input">
                                    <option value="onetime">Onetime</option>
                                    <option value="weekly">Weekly</option>
                                    <option select='true' value="monthly">Monthly</option>
                                </select>
                                <div className="roi--select-arrow">
                                    <ArrowDown />
                                </div>
                            </div>
                            <div className="wrap-selection">    
                                <select className="roi--select-input">
                                    <option value="12">Last year</option>
                                    <option select='true' value="36">3 years ago</option>
                                    <option value="60">5 years ago</option>
                                </select>
                                <div className="roi--select-arrow">
                                    <ArrowDown />
                                </div>
                            </div>
                        </div>
                        <div class="slider-wrap">
                            <div class="slider">
                                <div class="line"></div> 
                                <input type="range" min="5000" max="10000000" step="1000" value="100000" data-v-f5a75a14="" />
                            </div>
                        </div>
                        <div className="relative">
                            <div class="roi-investment">
                                <h6>Today, you’d have</h6>
                                <p><sup>₦</sup><span>221,713</span></p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default HomeSectionThree;
