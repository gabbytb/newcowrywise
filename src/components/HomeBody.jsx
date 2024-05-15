import { HomeSectionOne, HomeSectionTwo, HomeSectionThree, HomeSectionFour, HomeSectionFive, } from "../sections";




const HomeBody = () => {
    return (
        <main className="absolute top-0 w-full">
            <HomeSectionOne />
            <HomeSectionTwo />
            <HomeSectionThree />
            <HomeSectionFour />
            <HomeSectionFive />
        </main>
    );
};
export default HomeBody;
