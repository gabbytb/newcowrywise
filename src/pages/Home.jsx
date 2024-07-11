import { useRef } from "react";
import { HomeNav } from "../components"
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";








const Home = () => {

  const tawkMessengerRef = useRef();

  // const onLoad = () => {
  //   console.log('onLoad works!');
  // };

  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };


  return (
    <>
      <HomeNav />
      <main ref={tawkMessengerRef}>
        <div className="w-full m-0 p-0 home-container">
          <div className="bg-login bg-cover min-h-106">

          </div>
        </div>
      </main>
      <TawkMessengerReact 
        propertyId="644562484247f20fefed482e" 
        widgetId="1gungfrgj" 
        // onLoad={onLoad}
        onClick={handleMinimize}
      />
    </>
  );
};

export default Home;
