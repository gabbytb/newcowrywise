import { useState, useEffect } from "react";
import { flipItems } from "../constants";
import { Disqus } from "../components";





const HomeSectionSeven = () => {
    
    
    // Managing the active state of The INDEXED Flip Items
    const [itemToFlip, setItemToFlip] = useState(flipItems);
    // Managing the active state of The INDEXED Flip Items


    // Value changes to represent the "Active Index" of The INDEXED Flip Items
    const [count, setCount] = useState(0);
    console.log('Count: ', count);
    // Value changes to represent the "Active Index" of The INDEXED Flip Items






    useEffect(() => {
        const timer = setInterval(() => {
            console.clear();


            function autoIncrement() {  
                for (var n = 0; n < itemToFlip.length; n++) {                                       
                    if (n < itemToFlip.length) {


                        var disqusWrapID = document.getElementById('disqusWrapId');
                        var disqusObj = disqusWrapID.getElementsByClassName('disqus');


                        for (var i = 0; i < disqusObj.length; i++) {
                            console.log('Active Number: ', n);
                            console.log('Flip Object: ', itemToFlip[n]);

                            console.log('Current Number: ', i);
                            console.log('Discuss Object: ', disqusObj[i]);


                            // setCount(prevCount => (prevCount < i ? prevCount + 1 : 0));
                                
                            // if (n !== i) {
                            //     disqusObj[i]?.classList.add('is-active');
                            //     disqusObj[i]?.classList.remove('hidden');
                            // } else {
                            //     disqusObj[i]?.classList.remove('is-active');
                            //     disqusObj[i]?.classList.add('hidden');  
                            // };

                            // } else {
                            //     setCount(0);
                            // };
                        };
                    };
                };
            };

            autoIncrement();
        }, 2000);

        return () => clearInterval(timer);

    }, [count, itemToFlip]);

    

   
 
    

        
        // var disqusID = document.getElementById('disqosWrap');
        // var disqusItem = disqusID.getElementsByClassName('disqus'); 
        // for (var i = 0; i < disqusItem.length; i++) {
        //     console.log('ALL Current Flip Items: ', disqusItem.length);
        //     console.log('Current Flip Number: ', i);
        //     console.log('Current Flip Item: ', disqusItem[i]);


        //     var disqusID = document.getElementById('disqusId');
        //     var disqusItem = disqusID.getElementsByClassName('disqus-q'); 



        //     // if (itemToFlip[n]?.title === disqusItem[i]?.title) {
        //     //     return console.log('True: ', true);
        //     // } else {
        //     //     return console.log('False: ', false);
        //     // }
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
