import {useRef, useEffect, useState } from "react";
import { useInViewport } from "react-in-viewport";
import { customersQuotes, customersThumbnails } from "../constants";
import { TestimonialQuotes, TestimonialThumbnails } from "../components";
import { AppStoreIcon, PlayStoreIcon, VideoIcon } from "../assets/icons";
import { wura } from "../assets/images";








const HomeSectionOne = () => { 
    


    const myRef = useRef();
    const {
        inViewport,
        // enterCount,
        // leaveCount,
      } = useInViewport(
        myRef,
        // options,
        // config = { disconnectOnLeave: false },
        // props
    );

    


    // Check when Component is in viewport
    useEffect(() => {
        function myFunc() {
            if (inViewport) {
                var testimonialMedia = document.querySelector(".testimonial .testimonial-media");
                testimonialMedia.classList.remove('hidden');
                testimonialMedia.classList.add('s-1-anim');
            };

            document.querySelector(".testimonial .testimonial-video-ctrl").classList.add('z-9');
        };

        //  Not empty Array, so this should run multiple times as the dependency passed (i.e inViewport) would keep changing state everytime this section of my webpage is in view.
        //  This is used to clear the setTimeout function after it has run once!
        let timer = setTimeout(myFunc, 300);        
        
        //  Return a cleanup function to clear the timer
        return () => {
            clearTimeout(timer); // This will clear the timer when the component unmounts or when inViewport changes
        };
    }, [inViewport]);   // Pass inViewport as array dependency!     
    



    /***********************************************************************************************************************/
    /***********************************************************************************************************************/
    // PRESENT STATE of Active Image
    /***********************************************************************************************************************/
    const [activeImage, setActiveImage] = useState(wura);
    /***********************************************************************************************************************/
    /***********************************************************************************************************************/

    


    // Run when activeImage state changes
    useEffect(() => {
        function onActiveImgChange() {
            if (activeImage) {
                document.querySelector(".testimonial .testimonial-media").classList.add('s-1-anim');
                
                setTimeout(() => {                   
                    document.querySelector(".testimonial .testimonial-media").classList.remove('s-1-anim');       
                }, 500);
            };
        };
        onActiveImgChange();
    }, [activeImage]);  // Pass activeImage as array dependency!




    /***********************************************************************************************************************/
    /***********************************************************************************************************************/
    // PRESENT STATE of Customers Thumbnails
    /***********************************************************************************************************************/
    const [customThumbnails, setCustomThumbnails] = useState(customersThumbnails);
    /***********************************************************************************************************************/
    /***********************************************************************************************************************/
    

    useEffect(() => {        
        function realFunc() {       
            // Loop through each thumbnail 
            for (var n = 0; n < customThumbnails.length; n++) {

                // HERE: Check to find the one that matches the Current activeImage.
                if (activeImage === customThumbnails[n]?.imgURI) {
                    
                    var findTestimonial = document.getElementById('customers-testimonial');
                    var testimonialQuotes = findTestimonial.getElementsByClassName('testimonial-quotes');           // Get all elements inside testimonial, with the className 'testimonial-quotes'
                    
                    // Loop through each testimonial quote
                    for (var i = 0; i < testimonialQuotes.length; i++) {
                        
                        // HERE: If the current ACTIVE thumbnail index matches with the index of the testimonial quote, i.e n === i, Select Quote as ACTIVE, hide others!
                        if (n !== i) {
                            // Hide other testimonial quotes
                            testimonialQuotes[i].classList.add('hidden');
                            testimonialQuotes[i].classList.remove('is-active');
                        } else {
                            // Otherwise, show the testimonial quote as active
                            testimonialQuotes[i].classList.remove('hidden');
                            testimonialQuotes[i].classList.add('is-active');
                        };
                    };
                };
            };
        };
         // Call the function when the activeImage state changes
        realFunc();
    }, [activeImage, customThumbnails]);
        
    

    return (
        <section ref={myRef} className="home-section-one">
            <div className="h-container-1 container">
                <div className="s1-grids-wrap">


                    <div className="home-section-one--left">

                        <div className="customers-testimonials">
                            <div id="customers-testimonial" className="testimonial">
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
                                <div className="testimonial-media hidden">
                                    <img src={activeImage} alt="customer" />
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
                        <form className="hidden xs:my-12 xs:flex xs:max-w-80">
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
