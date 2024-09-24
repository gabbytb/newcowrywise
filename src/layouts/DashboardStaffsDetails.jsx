import { useEffect } from "react";
import CardAllAccountDetails from "../components/Cards/CardAllAccountDetails";








const DashboardStaffsDetails = () => {


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Admin Dashboard - View Info", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //


    // { isLoggedIn }
    // const isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // const userLastName = isLoggedIn.userLastName ? isLoggedIn.userLastName : logOut();
    // console.log("Logged-In User Last Name: ", userLastName);


    // function logOut() {
    //     localStorage.removeItem("user");
    //     navigate("/user/login");
    // };


    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full px-4">
                    <CardAllAccountDetails />
                </div>
            </div>
        </>
    );
};

export default DashboardStaffsDetails;