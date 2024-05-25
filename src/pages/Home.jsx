import { Nav, HomeBody, Footer } from "../components";




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
