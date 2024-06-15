import { useEffect, useState, } from "react";
import axios from "axios";






const AdminDashboard = () => {
    
    const [isLoading, setIsLoading] = useState(true);


    // ************************************
    // LOG-OUT CURRENTLY ACTIVE (LOGGED-IN USER)
    // ************************************
    function handleLogout() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location = redirToLogin;
    }
    // ************************************
    // LOG-OUT CURRENTLY ACTIVE (LOGGED-IN USER)
    // ************************************


    // ************************************
    // CURRENTLY ACTIVE (LOGGED-IN USER)
    // ************************************
    // LOGGED-IN USER
    const isLoggedIn = JSON.parse(localStorage.getItem("user"));      // console.log('Current Active User: ', isLoggedIn);
    // LOGGED-IN USER TOKEN
    const token = isLoggedIn.accessToken ? isLoggedIn.accessToken : handleLogout();
    // ************************************
    // CURRENTLY ACTIVE (LOGGED-IN USER
    // ************************************







    // ************************************
    // FIND ALL USERS
    // ************************************
    const [users, setUsers] = useState([]);
    console.log('All Users: ', users);
    // ************************************
    // FIND ALL USERS
    // ************************************


    // ************************************
    // // FIND ALL USERS
    // ************************************
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
    }, [token]);
    // ************************************
    // USE LOGGED-IN USER's 'TOKEN' FOR API:-  FIND ALL USERS
    // ************************************


    


    if (isLoading) {
        return (
            <div>
                <h5>Processing...</h5>
            </div>
        );
    };




    return (
        <div>
        
        </div>
    );
};


export default AdminDashboard;
