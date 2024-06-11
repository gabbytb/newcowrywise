import { HomeSectionOne, HomeSectionTwo, HomeSectionThree, HomeSectionFour, HomeSectionFive, HomeSectionSix, HomeSectionSeven, } from "../sections";


const HomeBody = () => {

    return (
        <main className="relative">
            <div>
                {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.6/lottie_svg.min.js"></script> */}
                <HomeSectionOne />
                <HomeSectionTwo />
                <HomeSectionThree />
                <HomeSectionFour />
                <HomeSectionFive />
                <HomeSectionSix />
                <HomeSectionSeven />
            </div>
        </main>
    );
};


export default HomeBody;
