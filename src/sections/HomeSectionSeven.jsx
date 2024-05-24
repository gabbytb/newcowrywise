import { useState, useEffect } from "react";
import { flipItems } from "../constants";
import { Disqus } from "../components";








const HomeSectionSeven = () => {

    
    // console.clear();


    const [count, setCount] = useState(0);
    console.log('Count: ', count);

    const [itemsToFlip, setItemsToFlip] = useState(flipItems);


    

    useEffect(() => {
        // Define the function to be called
        const myFunction = () => {
            for (var n = 0; n < itemsToFlip.length; n++) {
                if (count < n) {
                    setCount(count + 1);
                } else {
                    setCount(0);
                };
            };

            console.log('Function triggered!');
        };
    
        // Set up the interval
        const intervalId = setInterval(myFunction, 2000); // 120000 milliseconds = 2 minutes
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
      }, [count]); // Empty dependency array means this runs once on mount and cleans up on unmount
    


    




    return (
        <section className="home-section-seven">
            <div className="h-container-7 container">
                <div className="h-section-7-wrap">
                    <h6>why cowrywise?</h6>
                    <div id="disqusWrapId" className="relative">
                        {
                            flipItems.map((item) => {
                                return (
                                    <Disqus key={item.title} {...item} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};
export default HomeSectionSeven;
