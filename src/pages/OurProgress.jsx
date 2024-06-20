import { useEffect } from "react";
import { Nav, OurProgressBody, } from "../components";
import { Footer } from "../sections";






const OurProgress = () => {


    useEffect(() => {
        const pageTitle = "Our Progress",
        siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);


    return (
        <>
          <Nav />
          <div className="absolute top-0 w-full -z-10">
            <OurProgressBody />
            <Footer />
          </div>
        </>
    );
};


export default OurProgress;
