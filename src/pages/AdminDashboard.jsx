import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { brandOfficialLogo } from "../assets/images";
import { adminDashboardMenu } from "../constants";
import { DashboardMenuCard } from "../components";









const AdminDashboard = ({ isLoggedIn }) => {
    

    // *********************************************
    // CURRENTLY ACTIVE:- (LOGGED-IN USER)
    // *********************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));    
    // console.log('LOGGED-IN USER:- ', isLoggedIn);  
    // *********************************************
    // *********************************************
    


    // *********************************************
    // FUNCTION TO LOG-OUT LOGGED-IN USER
    // *********************************************
    function logOut() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location = redirToLogin;
    }
    // logOut();
    // *********************************************
    // *********************************************



    // *********************************************
    // DESTRUCTURE:-  (LOGGED-IN USER Props)
    // *********************************************
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    console.log("LOGGED-IN USER's Roles: ", userRoles);
    const userAccessToken = isLoggedIn?.accessToken ? isLoggedIn?.accessToken : logOut();
    console.log("LOGGED-IN USER's AccessToken: ", userAccessToken);



    // *******************************************************************
    // *******************************************************************
    const [isLoading, setIsLoading] = useState(true);
    // *******************************************************************
    // *******************************************************************



    // ************************************
    // MANAGE  STATE:-  ALL USERS
    // ************************************
    const [users, setUsers] = useState([]);
    console.log('All Users: ', users);
    // ************************************
    // CALL TO API:-  FIND ALL USERS
    // ************************************
    useEffect(() => {      
        // SET PAGE TITLE  
        const pageTitle = "Admin Dashboard",
        siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;


        function findAllUsers() {
            // setIsLoading(true); // Set isLoading state to true when fetching starts
            axios.get("http://127.0.0.1:8000/api/v1/admin/users/manage")
            .then((response) => {
                const { success, data, message } = response.data;
                    if ((!success) || (message === "Users not found")) {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };
                
                    // Perform Actions Here if Truthy
                    setUsers(data);
            })
            .catch((error) => {
                // Handle error state or logging here
                console.log("Error encountered: ", error);
            })
            .finally(() => {
                setIsLoading(false);    // Always disable loading state, whether successful or not
            });
        }

        var timerID = setTimeout(findAllUsers, 1800);   // Delay execution of findAllUsers by 1800ms
        return () => {
            clearTimeout(timerID);   // Clean up timer if component unmounts or token changes
        };
    }, []);
    // *******************************************************************************************//
    // *******************************************************************************************//






    return (
        <>
            { 
                isLoading ? (
                    <section className="admin-dashboard">
                        <div className="container admin-container">
                            <div className="s1-grids-wrap">
                                <h5>Processing...</h5>
                            </div>
                        </div>
                    </section> 
                ) : (
                    <section id="adminDashboardID" className="admin-dashboard">
                        <div className="container flex admin-container">
                            <div className="h-screen w-full">

                                <div className="flex flex-col gap-8 items-center h-full w-full px-0 relative left-pane bg-skin-darkblue">         
                                    <Link to={"/"} className="pt-1.5 w-full flex justify-center bg-white brand">
                                        <img src={brandOfficialLogo} alt="official logo" />
                                    </Link>

                                    <ul className="flex flex-col w-full px-8">
                                        <small className="text-white text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Settings</small>
                                        {
                                            adminDashboardMenu.map((item) => {
                                                return (
                                                    <DashboardMenuCard key={item.label} {...item} />
                                                );
                                            })
                                        }
                                    </ul>
                                </div>



                                <div className="right-pane">
                                    
                                </div>

                            </div>
                        </div>
                    </section>
                )
            }
        </>
    );
};


export default AdminDashboard;
