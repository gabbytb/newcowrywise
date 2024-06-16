import { useEffect, useState, } from "react";
import axios from "axios";







const AdminDashboard = () => {
    
    const [isLoading, setIsLoading] = useState(true);



    // *********************************************
    // CURRENTLY ACTIVE:- (LOGGED-IN USER)
    // *********************************************
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));    
    console.log('LOGGED-IN USER:- ', isLoggedIn);  
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
    const token = isLoggedIn.accessToken ? isLoggedIn.accessToken : logOut();









    // ************************************
    // MANAGE  STATE:-  ALL USERS
    // ************************************
    const [users, setUsers] = useState([]);
    console.log('All Users: ', users);
    // ************************************
    // ************************************


    // *******************************************************
    // API:-  FIND ALL USERS
    // *******************************************************
    useEffect(() => {
        function disableIsLoading() {
            setIsLoading(false);
        };
        function findAllUsers() {
            axios.get("http://127.0.0.1:8000/api/v1/admin/users/manage", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const { success, data, message } = res.data;
                if ((!success) || (message === "Users not found")) {
                    console.log("Success: ", success);
                    console.log("Message: ", message);
                };
                
                // Perform These Actions
                setUsers(data);
            })
            .catch((error) => {
                console.log("Error encountered: ", error);
            })
            .finally(disableIsLoading);
        };
        setTimeout(findAllUsers, 1800);
    }, [token]);  // As Dependency Array:- Means Use Logged-in User's 'token' to trigger react useEffect() hook !
    // *******************************************************
    // *******************************************************


    


    if (isLoading) {
        return (
            <div>
                <h5>Processing...</h5>
            </div>
        );
    };




    return (
        <section className="admin-dashboard">
            <div className="h-container-1 container">
                <div className="s1-grids-wrap">
                
                </div>
            </div>
        </section>
    );
};


export default AdminDashboard;
