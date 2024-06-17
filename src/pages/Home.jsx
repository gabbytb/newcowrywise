import { useEffect } from "react";
import { Nav, HomeBody, } from "../components";
import { Footer } from "../sections";




const Home = () => {




  useEffect(() => {
    const pageTitle = "Home",
    siteTitle = "Samuel Akinola Foundation";
    document.title = `${pageTitle} | ${siteTitle}`;
}, []);




  return (
    <>
      <Nav />
      <div className="absolute top-0 w-full -z-10">
        <HomeBody />
        <Footer />
      </div>
    </>
  );
};
export default Home;
