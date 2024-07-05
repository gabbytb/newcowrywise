import { useRef } from "react";
import { HomeNav } from "../components"
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";





const Home = () => {

  const tawkMessengerRef = useRef();

  const onLoad = () => {
    console.log('onLoad works!');
  };

  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };


  return (
    <>
      <HomeNav />
      <main>
        <div>
          <TawkMessengerReact 
            propertyId="644562484247f20fefed482e" 
            widgetId="1gungfrgj" 
            onLoad={onLoad}
            onClick={handleMinimize}
          />
        </div>
      </main>
    </>
  );
};

export default Home
