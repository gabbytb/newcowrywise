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


    async function showTestimonial() {
        var cusTestimonial = document.getElementById('customerTestimonial');               
        cusTestimonial.classList.remove('opacity-0');        
        cusTestimonial.classList.remove('hidden');     

        cusTestimonial.classList.add('testimonial--active');
        console.log('Found Testimonial: ', cusTestimonial);
    }

    useEffect(() => {
        showTestimonial();
    }, []);


    return (
        <section className="home-section-one">
            <div className="h-container-1 container">
<<<<<<< HEAD
                <div className="flex justify-between py-32 px-0">

=======
                <div className="h-section-1-wrap">
>>>>>>> 21a1eae6909ee66c989b024956287499d9003051

                   
                    <div className="relative home-section-one--left min-h-126">
                        <div className="customers-testimonials h-full">
                            <div id="customerTestimonial" className="w-127 h-full testimonial opacity-0 hidden">
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
                                <div id="sectionOneAnim" className="absolute top-0 left-0 bottom-0 right-0 h-full w-124 testimonial-media">
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
