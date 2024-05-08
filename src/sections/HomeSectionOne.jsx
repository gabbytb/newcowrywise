import { Link } from "react-router-dom";
import { VideoIcon } from "../assets/icons";
import { wura } from "../assets/images";




const HomeSectionOne = () => {
    return (
        <section className="absolute top-0 py-14.5 px-0">
            <div className="container">
                <div className="flex justify-between py-20 px-0 space-x-12">


                    <div className="relative home-section-one--left">
                        <div className="customers-testimonials">

                            <div className="testimonial w-125">
                                <div className="absolute testimonial-backdrop"></div>
                                <div className="testimonial-video-ctrl"><VideoIcon /></div>
                                <div className="absolute testimonial-quotes">
                                    <blockquote>I've become more conscious of how I spend my money and also about investing. Now, I feel comfortable spending knowing my Cowrywise account is there.</blockquote>
                                    <div className="mt-6 testimonial-author">
                                        <span>Wuraola F</span>
                                        <Link to="https://cowrywise.com/@wuwu" target="_blank">@wuwu</Link>
                                    </div>
                                </div>
                                <div className="bg-white aboslute testimonial-overlay"></div>
                                <div className="relative overflow-hidden h-126 w-124 testimonial-media">
                                    <img className="" src={wura} alt="customer" />
                                </div>
                            </div>


                        </div>
                        <ul>

                        </ul>
                    </div>

                    
                    <div className="home-section-one--right">

                    </div>



                </div>
            </div>
        </section>
    )
}

export default HomeSectionOne
