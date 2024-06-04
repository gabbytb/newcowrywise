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
        enterCount,
        // leaveCount,
      } = useInViewport(
        myRef,
        // options,
        // config = { disconnectOnLeave: false },
        // props
    );
    const [hasLoaded, setHasLoaded] = useState(0);
   
    


    // Check when Component is in viewport, LOAD THE BACKGROUND ACTIVE IMAGE WITH ANIMATION
    useEffect(() => {
        function myFunc() {
            if (inViewport) {
                setHasLoaded(enterCount);

                if (hasLoaded === 0) {
                    var testimonialMedia = document.querySelector("#testimonialId .testimonial-media");             
                    testimonialMedia.classList.remove('hidden');
                    testimonialMedia.classList.add('s-1-anim');

                    setTimeout(() => {
                        testimonialMedia.classList.remove('s-1-anim');
                    }, 400);
                };
            };

            document.querySelector("#testimonialId .testimonial-video-ctrl").classList.add('z-9');
        };

        //  Not empty Array, so this should run multiple times as "inViewport" would keep changing state everytime this section of my webpage is in view.
        //  This is used to clear the setTimeout function after it has run once!
        var timer = setTimeout(myFunc, 400);
        
        //  Return a cleanup function to clear the timer
        return () => {
            clearTimeout(timer); // This will clear the timer when the component unmounts or when inViewport changes
        };
    }, [inViewport]);   // Pass inViewport as array dependencies!     
    

  

    
    /***********************************************************************************************************************/
    /***********************************************************************************************************************/
    // PRESENT STATE of Active Image
    /***********************************************************************************************************************/
    const [activeImage, setActiveImage] = useState(wura);
    /***********************************************************************************************************************/
    // FOR: When "activeImage" state changes, LOAD THE CURRENT BACKGROUND ACTIVE IMAGE WITH ANIMATION
    /***********************************************************************************************************************/
    useEffect(() => {
        // Create function
        function onActiveImgChange() {
            // if the "activeImage" value is Truthy
            if (activeImage && hasLoaded === 1) {
                // This should execute first
                document.querySelector("#testimonialId .testimonial-media").classList.add('s-1-animate');
                
                // This should executed @ .4ms later
                setTimeout(() => {                   
                    document.querySelector("#testimonialId .testimonial-media").classList.remove('s-1-animate');       
                }, 300);
            }
        };
        // Call Function
        onActiveImgChange();
    }, [activeImage]);      // PASS: "activeImage" as array dependency for the useEffect() hook to rely on!
    /***********************************************************************************************************************/
    /***********************************************************************************************************************/


    

    /***********************************************************************************************************************/
    /***********************************************************************************************************************/
    // PRESENT STATE of Customers Thumbnails
    /***********************************************************************************************************************/
    const [customThumbnails, setCustomThumbnails] = useState(customersThumbnails);
    /***********************************************************************************************************************/
    // FOR: When "activeImage" state changes
    /***********************************************************************************************************************/
    useEffect(() => {        
        function realFunc() {       
            // Initiate a variable to be all the 'index' of customThumbnails.
            for (var n = 0; n < customThumbnails.length; n++) {

                // HERE: Find the 'index' of customThumbnails that has the same "imgURI" value as the "activeImage" value.
                // If Truthy,
                if (activeImage === customThumbnails[n]?.imgURI) {
                    
                    // Find all DOM elements with the className 'testimonial-quotes'.
                    var testimonialQuotes = document.querySelectorAll(".testimonial-quotes");
                    for (var i = 0; i < testimonialQuotes.length; i++) {
                 
                        // HERE: If the current ACTIVE thumbnail index matches with the index of the testimonial quote.
                        // If Truthy,
                        if (n === i) {      // NOTE: ...how to make an index become active, based on another index.... (FYI)
                            // If the "index" value of testimonialQuotes is the same as the "index" value of customThumbnails; 
                            // Show item - (remove the 'hidden' css class).
                            testimonialQuotes[i].classList.remove('hidden');
                            testimonialQuotes[i].classList.add('flex');

                            // HERE: If the current ACTIVE quote index is the first index (i.e 0), change "Backdrop" BackgroundColor to Pink.
                            // If Truthy,
                            var backDrop = document.querySelector('#testimonialId .testimonial-backdrop');
                            if (i === 0) {
                                backDrop.classList.remove('bg-blue-600/25');
                                backDrop.classList.add('bg-pink-600/25');
                            } else {                               
                                backDrop.classList.remove('bg-pink-600/25');
                                backDrop.classList.add('bg-blue-600/25');
                            };
                        } else {
                            // If the "index" value of testimonialQuotes is not the same as the "index" value of customThumbnails;
                            // Hide item(s) - (use the 'hidden' css class).
                            testimonialQuotes[i].classList.add('hidden');
                            testimonialQuotes[i].classList.remove('flex');                            
                        };
                    };
                };
            };
        };
         // Call the function when the activeImage state changes
        realFunc();
    }, [activeImage]);    // PASS: "activeImage" as array dependency for useEffect() hook to rely on!
    /***********************************************************************************************************************/
    /***********************************************************************************************************************/






       
    return (
        <section ref={myRef} className="home-section-one">
            <div className="h-container-1 container">
                <div className="s1-grids-wrap">


                    <div className="home-section-one--left">
                        <div className="customers-testimonials">
                            <div id="testimonialId">
                                <div className="absolute testimonial-backdrop opacity-100 dark:opacity-0"></div>
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
