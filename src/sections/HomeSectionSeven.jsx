import { useState, useEffect } from "react";
import { flipItems } from "../constants";
import { Disqus } from "../components";






const HomeSectionSeven = () => {
    
    
    const [itemsToFlip, setItemsToFlip] = useState(flipItems);

    
    const [count, setCount] = useState(0);


    

    useEffect(() => {
        function myFunction() {            
            for (var n = 0; n < itemsToFlip.length; n++) {    
                if (count <= n) {
                    setCount(count + 1);                   
                        
                    var disqusObj = document.getElementsByClassName('disqus');            
                    for (var i = 0; i < disqusObj.length; i++) {               
                        if (count === i) { 
                            disqusObj[i].classList.remove('hidden');
                            disqusObj[i].classList.add('activated');
                        } else {
                            disqusObj[i].classList.add('hidden');
                            disqusObj[i].classList.remove('activated');
                        }
                    };
                } else {
                    setCount(0);
                }
            };
        };

        // Setup interval
        var intervalId = setInterval(myFunction, 2500);
    
        // Clean up interval when component unmount
        return () => clearInterval(intervalId);
    }, [count]); 
    // NOTE: Empty dependency array means this runs once on mount and cleans up on unmount
    



    return (
        <section className="home-section-seven">
            <div className="h-container-7 container">
                <div className="h-section-7-wrap">
                    <h6>why cowrywise?</h6>
                    <div id="disqusWrapID" className="relative">
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
