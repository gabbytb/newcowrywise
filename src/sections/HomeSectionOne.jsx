import { useEffect, useState } from "react";
import { customersQuotes, customersThumbnails } from "../constants";
import { TestimonialQuotes, TestimonialThumbnails } from "../components";
import { AppStoreIcon, PlayStoreIcon, VideoIcon } from "../assets/icons";
import { wura } from "../assets/images";







const HomeSectionOne = () => { 

    const [activeImage, setActiveImage] = useState(wura);
    console.log("Active Thumbnail: ", activeImage);   


    useEffect(() => {
        function myFunction() {
            document.getElementById("sectionOneAnim").classList.add('s-1-anim');
        }

        myFunction();        
    }, []);

        
    return (
        <section className="home-section-one">
            <div className="h-container-1 container">
                <div className="s1-grids-wrap">


                    <div className="home-section-one--left">
                        <div className="customers-testimonials">
                            <div className="testimonial">
                                <div className="absolute testimonial-backdrop"></div>
                                <div className="testimonial-video-ctrl"><VideoIcon /></div>
                                {
                                    customersQuotes.map((item) => {
                                        return (
                                            <TestimonialQuotes key={item.textAuthor} {...item} />
                                        );
                                    })
                                }
                                <div className="bg-white aboslute top-0 left-0 w-full h-full testimonial-overlay"></div>
                                <div id="sectionOneAnim" className="absolute top-0 left-0 bottom-0 right-0 h-130 w-135 z-3 testimonial-media xs:h-122 sm:h-130 xs:w-full lg:w-135">
                                    <img src={activeImage} alt="customer"/>
                                </div>
                            </div>
                        </div>
                        <ul className="testimonials-thumbnail">
                            {
                                customersThumbnails.map((item) => {
                                    return (
                                        <li key={item.label} className="cursor-pointer relative w-16 h-16 lg:my-5 lg:mr-8">
                                            <TestimonialThumbnails
                                                exactItem={item}
                                                activeImage={activeImage}
                                                changeActiveImage={(item) => setActiveImage(item)}
                                            />
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>

                    
                    <div className="home-section-one--right">
                        <h1>Put your <br />money to work</h1>
                        <h6>Invest wisely. Grow wealth.</h6>
                        <form className="hidden xs:my-12 xs:flex xs:max-w-80 ">
                            <input className="flex-1 min-w-80 border mr-4 px-5 text-2xl rounded-lg" type="email" required name="email" placeholder="Your email..." />
                            <button className="capitalize bg-blue-600 min-h-20 px-8 text-2xl text-white font-bold rounded-lg" type="submit">start investing</button>
                        </form>
                        <div className="social-icons">
                            <PlayStoreIcon />
                            <AppStoreIcon />
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default HomeSectionOne;
