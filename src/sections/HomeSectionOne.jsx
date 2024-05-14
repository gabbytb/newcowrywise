import { useEffect, useState } from "react";
import { customersQuotes, customersThumbnails } from "../constants";
import { TestimonialQuotes, TestimonialThumbnails } from "../components";
import { VideoIcon } from "../assets/icons";
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
                <div className="grid grid-cols-16 gap-x-32 py-32 px-0 
                sm:flex sm:flex-col-reverse sm:gap-y-12 sm:py-16 
                lg:grid lg:grid-cols-16 lg:gap-x-32 lg:py-32 lg:px-0">


                    <div className="relative home-section-one--left min-h-126">
                        <div className="customers-testimonials h-full">
                            <div className="h-full testimonial">
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
                                <div id="sectionOneAnim" className="absolute top-0 left-0 bottom-0 right-0 h-full w-135 testimonial-media lg:h-130 lg:w-135">
                                    <img src={activeImage} alt="customer"/>
                                </div>
                            </div>
                        </div>
                        <ul className="flex absolute -bottom-100 testimonials-thumbnail">
                            {
                                customersThumbnails.map((item) => {
                                    return (
                                        <li key={item.label} className="w-16 h-20 my-5 mr-8 cursor-pointer relative">
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

                    
                    <div className="home-section-one--right pt-20 sm:pt-0 lg:pt-24">
                        <h1>Put your <br />money to work</h1>
                        <h6>Invest wisely. Grow wealth.</h6>
                        <form className="flex max-w-80 sm:my-12">
                            <input className="flex-1 min-w-80 border mr-4 px-5 text-2xl rounded-lg" type="email" required name="email" placeholder="Your email..." />
                            <button className="capitalize bg-blue-600 min-h-20 px-8 text-2xl text-white font-bold rounded-lg" type="submit">start investing</button>
                        </form>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default HomeSectionOne;
