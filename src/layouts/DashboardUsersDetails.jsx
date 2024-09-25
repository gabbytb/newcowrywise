import { useEffect, } from "react";
import { googleLogout } from "@react-oauth/google";
import { useParams, useNavigate, } from "react-router-dom";
import api from '../api';
import { Sidebar, AdminNavbar, CardAllAccountDetails, } from "../components";









const DashboardUsersDetails = ({ isLoggedIn }) => {

    // console.clear();

    const navigate = useNavigate();
    

    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Admin Dashboard - VIEW USER", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //

    
    // ***************************************************************************
    // CURRENT ACTIVE USER:-
    // ***************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // ***************************************************************************
    // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
    // ***************************************************************************
    function logOut() {
        // Clear User Details from Local Storage
        localStorage.removeItem("user");
        localStorage.clear();
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        // const redirToLOGIN = "/user/login";
        // window.location.replace(redirToLOGIN);
        navigate("/user/login");
    };
    // ***************************************************************************
    // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
    // ***************************************************************************
    const lastName = isLoggedIn?.lastName ? isLoggedIn?.lastName : logOut();
    console.log("Logged-In User Last Name: ", lastName);
    // ***************************************************************************
    // ***************************************************************************

    


    // ************************************
    // MANAGE STATE:-  TO FIND USER BY ID
    // ************************************
    const id = useParams();
    console.log("STAFF ID: ", id);
    // const [ user, setUser ] = useState(null);
   
    // **************************************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND USER BY ID
    // **************************************************************************************************
    useEffect(() => {      
        function findMyUserByID() {
            const url = `/api/v1/auth/account/manage/${id}`;
            api.get(url)
            .then((response) => {
                const { success, data, message } = response.data;
                // if ((!success) || (message === "User not found")) {
                //     console.log("Message: ", message);
                //     console.log("Success: ", success);
                // };
                            
                // // Perform Actions Here if Truthy
                // setUser(data);
                console.log("Success: ", success);
                console.log("Data: ", data);
                console.log("Message: ", message);
            })
            .catch((error) => {
                // Handle error state or logging here
                console.log("Error encountered: ", error);
            });
            // .finally(() => {
            //     setIsLoading(false);    // Always disable loading state, whether successful or not
            // });
        };
        
        var timerID = setTimeout(findMyUserByID, 500);   // Delay execution of findAllUsers by 1800ms
        return () => {
            // Clean up timer if component unmounts or token changes
            clearTimeout(timerID);
        };
    }, [id]);
    // *******************************************************************************************//
    // *******************************************************************************************//
    
    // console.log("User with ID: ", user);




    return (
            <>
                {/***** LEFT-PANEL *****/}
                <Sidebar />
                {/***** LEFT-PANEL *****/}
                

                
                {/***** RIGHT-PANEL *****/}
                <div className="relative md:ml-64 bg-blueGray-100">
                    <AdminNavbar />
                    
                    {/* Header */}
                    <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
                
                        {/* Welcome Logged-In User */}
                        <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                            <p className="w-full lg:w-6/12 xl:w-3/12 px-4 text-3xl text-white">     
                                Welcome <span className="font-bold text-white">{lastName}</span>
                            </p>
                        </div>                
                        {/* <HeaderStats /> */}

                    </div>

                    <div className="px-4 md:px-10 mx-auto w-full -m-24">                    
                        <div className="flex flex-wrap">
                            <div className="w-full px-4">
                                
                                {/* Users Details */}
                                <CardAllAccountDetails />
                                {/* Users Details */}

                            </div>
                        </div>
                    </div>                         
                </div>
                {/***** RIGHT-PANEL *****/}
            </>
    );
};

export default DashboardUsersDetails;
