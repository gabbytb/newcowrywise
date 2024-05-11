import { SliderCards } from "../components";
import { sliderItems } from "../constants";




const HomeSectionFour = () => {
  
    return (
        <section className="home-section-four">
            <div className="h-container-4 container">
                <div className="flex">
                    <div className="w-5/12 text-8xl/tighter font-semibold -tracking-tighten p-2.5">
                        <h2 className="mt-14 mb-10 text-sky-950/100">You name it, we’ve figured it out.</h2>
                    </div>
                </div>
            </div>


            <div className="slider-wrapper">
                <div className="slides-wrap">
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
