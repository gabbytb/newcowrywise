import { useState, useEffect } from "react";
import { Nav, OurProgressBody, } from "../components";
import { Footer } from "../sections";






const OurProgress = () => {


    useEffect(() => {
        const pageTitle = "Our Progress",
        siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);

    const [progress, setProgress] = useState(0);

    async function autoIncrement() {
      for (var n = 0; n < 100; n++) {
        if (progress < 100) {
          setProgress(n++);
          return progress;
        };
      };
    };
          

    return (
        <>
          <div className="jumbu">
            <label htmlFor="file" className="progress_label"></label>
              <progress id="file" className="flex" value={10} max={100}>CLICK OVER HERE</progress>
          </div>

          <Nav onLoad={autoIncrement} />
          <div className="absolute top-0 w-full -z-10">
            <OurProgressBody />
            <Footer />
          </div>
        </>
    );
};


export default OurProgress;
