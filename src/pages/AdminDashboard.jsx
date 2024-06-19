import { useEffect, useState, } from "react";
import axios from "axios";









const AdminDashboard = () => {
    

    // *********************************************
    // CURRENTLY ACTIVE:- (LOGGED-IN USER)
    // *********************************************
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));    
    // console.log('LOGGED-IN USER:- ', isLoggedIn);  
    // *********************************************
    // *********************************************


    // *********************************************
    // FUNCTION TO HANDLE:-  (LOG-OUT)
    // *********************************************
    function logOut() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location = redirToLogin;
    }
    // *********************************************
    // *********************************************


    // *********************************************
    // DESTRUCTURE:-  (LOGGED-IN USER Props)
    // *********************************************
    const token = isLoggedIn?.accessToken ? isLoggedIn?.accessToken : logOut();
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    console.log("LOGGED-IN USER's Roles: ", userRoles);






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
    function findAllUsers() {
        // setIsLoading(true); // Set isLoading state to true when fetching starts
        axios.get("http://127.0.0.1:8000/api/v1/admin/users/manage", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
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
    };
    useEffect(() => {      
        // SET PAGE TITLE  
        const pageTitle = "Admin Dashboard",
        siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;


        var timerID = setTimeout(findAllUsers, 1800);   // Delay execution of findAllUsers by 1800ms
        return () => {
            clearTimeout(timerID);   // Clean up timer if component unmounts or token changes
        };
    }, [token]);  // useEffect dependency on token
    // *******************************************************************************************//
    // Means Logged-in Users 'token' is responsible for triggering this react useEffect() hook !
    // *******************************************************************************************//
    // *******************************************************************************************//






    return (
        <>
            { 
                isLoading ? (
                    <section className="admin-dashboard">
                        <div className="h-container-1 container">
                            <div className="s1-grids-wrap">
                                <h5>Processing...</h5>
                            </div>
                        </div>
                    </section> 
                ) : (
                    <section className="admin-dashboard">
                        <div className="h-container-1 container">
                            <div className="s1-grids-wrap">
                            
                            </div>
                        </div>
                    </section>
                )
            }
        </>
    );
};


export default AdminDashboard;
