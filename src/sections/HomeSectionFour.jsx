import { useEffect } from "react";
import { SliderCards } from "../components";
import { sliderItems } from "../constants";




const HomeSectionFour = () => {
    
        
    function scrollFunction() {   
        var scrollWheel = document.getElementById('autoScroll');
        scrollWheel.classList.add('s-4-anim');
    };
    
    
    useEffect(() => {
        scrollFunction();
    }, []);


    return (
        <section className="home-section-four">
            <div className="h-container-4 container">
                <div className="flex">
                    <div className="xs:basis-full sm:basis-5/12 text-8xl/tighter font-semibold -tracking-tighten p-2.5">
                        <h2 className="mt-14 mb-10 text-sky-950/100 -tracking-moretight sm:text-35xl/tight lg:w-123.3 xl:w-full">You name it, we’ve figured it out.</h2>
                    </div>
                </div>
            </div>


            <div className="slider-wrapper">
                <div id="autoScroll" className="slides-wrap">
                    <div className="slides">
                        {
                            sliderItems.map((item) => {
                                return (
                                    <SliderCards key={item.label} {...item} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSectionFour;
