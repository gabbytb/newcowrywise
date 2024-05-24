import { useState, useEffect } from "react";
import { flipItems } from "../constants";
import { Disqus } from "../components";





const HomeSectionSeven = () => {
    
    
    // Managing the active state of The INDEXED Flip Items
    const [itemsToFlip, setItemsToFlip] = useState(flipItems);
    // Managing the active state of The INDEXED Flip Items


    // Value changes to represent the "Active Index" of The INDEXED Flip Items
    const [count, setCount] = useState(0);
    // Value changes to represent the "Active Index" of The INDEXED Flip Items




    

    useEffect(() => {
        function myFunction() {
            console.clear();

            
            for (var n = 0; n < itemsToFlip.length; n++) {    
                if (count < n) {
                    setCount(count + 1); 
                    console.log('Count: ', count);
                        
                    var disqusWrapID = document.getElementById('disqusWrapId');
                    var disqusObj = disqusWrapID.getElementsByClassName('disqus');                                
                    for (var i = 0; i < disqusObj.length; i++) {

                        
                        if (count === i) {           
                                                        
                            var titleFound = document.getElementsByClassName('disqus-q');
                            for (var c = 0; c < titleFound.length; c++) {
                                console.log('CURRENT ACTIVE VALUE: ', c);
                                console.log('i: ', i);
                                console.log('Flip Title: ', itemsToFlip[n]?.title);
                                console.log('Matches Title: ', titleFound[c]?.innerHTML);
                            }      
                        }  
                    };
                } else {
                    setCount(0);
                };
            };
        };

        // Set up the interval
        const intervalId = setInterval(myFunction, 2000); // 120000 milliseconds = 2 minutes
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [count]); // Empty dependency array means this runs once on mount and cleans up on unmount
    



    // if (n !== i) {
    //     disqusObj[i]?.classList.remove('hidden');
    //     disqusObj[i]?.classList.add('is-active');
        
    //     console.log('CURRENT ACTIVE ITEM INDEX: ', disqusObj[i]);
    // } else {
    //     disqusObj[i]?.classList.add('hidden');
    //     disqusObj[i]?.classList.remove('is-active');
    // }
            

    




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
