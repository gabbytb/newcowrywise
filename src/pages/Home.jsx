import { useRef, useEffect, } from "react";
import { HomeNav } from "../components"
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";








const Home = () => {



  // *************************** //
  // *** SET PAGE TITLE(SEO) *** //
  // *************************** //
  useEffect(() => {
      const pageTitle = "Reaching out to Great Minds", siteTitle = "Samuel Akinola Foundation";
      document.title = `${pageTitle} | ${siteTitle}`;
  }, []);
  // *************************** //
  // *** SET PAGE TITLE(SEO) *** //
  // *************************** //




  
  const tawkMessengerRef = useRef();

  // const onLoad = () => {
  //   console.log('onLoad works!');
  // };

  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };



  
  
  return (
    <>

      {/* <label htmlFor="file" className="progress_label">File progress:
        <progress id="file" max="100" value="70">70%</progress>
      </label> */}

      <HomeNav />
      <main ref={tawkMessengerRef}>
        <div className="w-full m-0 p-0 home-container">
          <div className="bg-login bg-cover min-h-106">

          </div>
        </div>
      </main>

 

      {/* Production Data Supplied */}
      <TawkMessengerReact
        propertyId="644562484247f20fefed482e" 
        widgetId="1gungfrgj" 
        // onLoad={onLoad}
        onClick={handleMinimize}
      />
      {/* Production Data Supplied */}
    </>
  );
};

export default Home;
