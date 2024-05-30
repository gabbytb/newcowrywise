import { Nav, HomeBody, } from "../components";
import { Footer } from "../sections";




const Home = () => {
  return (
    <>
      <Nav />
      <div className="absolute top-0 w-full">
        <HomeBody />
        <Footer />
      </div>
    </>
  );
};
export default Home;
