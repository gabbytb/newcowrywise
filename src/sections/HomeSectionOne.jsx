import { useState } from "react";
import { customersQuotes, customersThumbnails } from "../constants";
import { TestimonialQuotes, TestimonialThumbnails } from "../components";
import { VideoIcon } from "../assets/icons";
import { wura } from "../assets/images";






const HomeSectionOne = () => {

    /********************************************************/
    /******************** demacation ************************/
    /********************************************************/
    const [customersQuo, setCustomQuo] = useState(customersQuotes);
    // console.log("Showing Customers Quotes: ", customersQuo);   

    const [customersThumb, setCustomersThumb] = useState(customersThumbnails);
    // console.log("Showing Customers Thumbnails: ", customersThumb);   

    const [activeImage, setActiveImage] = useState(wura);
    // console.log("Active Thumbnail: ", activeImage);   


    function handleActiveQuote() {
        for (var i = 0; i < customersThumb.length; i++) {
            if (activeImage === customersThumb[i].imgURI) {           
                // console.clear();
                console.log("Active Customer Quote: ", customersThumb[i]);
                var isHidden = document.querySelector('.testimonial-quotes');          

                isHidden = customersQuo[i];
                console.log("Is Hidden is Present: ", isHidden);
                return isHidden;

            }            
        }
    }
    handleActiveQuote();


    return (
        <section className="home-section-one">
            <div className="h-container-1 max-container">
                <div className="flex justify-between py-20 px-0">


                    <div className="relative home-section-one--left min-h-126">
                        <div className="customers-testimonials h-full">
                            <div className="w-127 h-full testimonial">
                                <div className="absolute testimonial-backdrop"></div>
                                <div className="testimonial-video-ctrl"><VideoIcon /></div>
                                {
                                    customersQuotes.map((item) => {
                                        return (
                                            <TestimonialQuotes key={item.textAuthor} {...item} />
                                        );
                                    })
                                }
                                <div className="bg-white aboslute testimonial-overlay"></div>
                                <div className="absolute top-0 h-full w-124 testimonial-media">
                                    <img src={activeImage} alt="customer" />
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

                    
                    <div className="home-section-one--right pt-20">
                        <h1>Put your <br />money to work</h1>
                        <h6>Invest wisely. Grow wealth.</h6>
                        <form className="flex max-w-80">
                            <input className="flex-1 min-w-63 border mr-4 px-5 text-2xl rounded-lg" type="email" required name="email" placeholder="Your email..." />
                            <button className="capitalize bg-blue-600 min-h-16 px-8 text-2xl text-white font-bold rounded-lg" type="submit">start investing</button>
                        </form>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default HomeSectionOne;
