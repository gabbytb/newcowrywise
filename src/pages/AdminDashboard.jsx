import { act, useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { brandOfficialLogo } from "../assets/images";
import { UsersIcon } from "../assets/icons";
// import { dashboardMenuUsers } from "../constants";
// import { DashboardMenuCard } from "../components";







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



    // *******************************************************************************************//
    // ADMIN MENU: DropDown Controller
    // *******************************************************************************************//
    function dropdownFunction() {
        var usersDropDown = document.getElementById("usersDropdown"),
        staffsDropDown = document.getElementById("staffsDropdown");


        if (usersDropDown?.classList.contains('hidden')) {
            usersDropDown?.classList.remove('hidden');
            usersDropDown?.classList.add('flex');
        } else {
            usersDropDown?.classList.remove('flex');
            usersDropDown?.classList.add('hidden');
        };


        if (staffsDropDown?.classList.contains('hidden')) {
            staffsDropDown?.classList.remove('hidden');
            staffsDropDown?.classList.add('flex');
        } else {
            staffsDropDown?.classList.remove('flex');
            staffsDropDown?.classList.add('hidden');
        };
    };
    // *******************************************************************************************//
    // *******************************************************************************************//



    const [activeDisplay, setActiveDisplay] = useState("/");





    return (
        <>
            { 
                isLoading ? (
                    <main className="admin-dashboard">
                        <div className="container admin-container">
                            <div className="s1-grids-wrap">
                                <h5>Processing...</h5>
                            </div>
                        </div>
                    </main> 
                ) : (
                    <main id="adminDashboardID" className="admin-dashboard">
                        <div className="container flex admin-container">
                            <div className="h-screen w-full grid grid-cols-24">

                                <section className="flex flex-col gap-8 items-center h-full w-full px-0 relative left-pane bg-skin-darkblue">         
                                    <Link to={"/"} className="pt-1.5 w-full flex justify-center bg-white brand">
                                        <img src={brandOfficialLogo} alt="official logo" />
                                    </Link>

                                    <ul className="flex flex-col w-full px-8">
                                        {/* SETTINGS MENU */}
                                        <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Settings</small>
                                        <div className="flex flex-col gap-8">
                                            <div className="flex flex-col gap-4 dropdown">
                                                <button onClick={dropdownFunction} className="dropbtn">
                                                    <UsersIcon /> <span>users</span>
                                                </button>
                                                <div id="usersDropdown" className="hidden flex-col gap-4 px-15.9">
                                                    <Link to="javascript:void(0)" onClick={(e) => setActiveDisplay("users")}>user management</Link>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 dropdown">
                                                <button onClick={dropdownFunction} className="dropbtn">
                                                    <UsersIcon /> <span>staffs</span>
                                                </button>
                                                <div id="staffsDropdown" className="hidden flex-col gap-4 px-15.9">
                                                    <Link to="javascript:void(0)" onClick={(e) => setActiveDisplay("staffs")}>staff management</Link>
                                                </div>
                                            </div>
                                        </div>
                                        {/* SETTINGS MENU */}
                                    </ul>
                                </section>



                                <aside className={`right-pane bg-red-500 ${activeDisplay === "users" ? "block" : "hidden" }`}>
                                    <table className="table-fixed capitalize">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>E-MAIL</th>
                                                <th>STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((user) => {
                                                    return (
                                                        user?.roles?.map((roleStaff, index) => {
                                                            if (roleStaff?.role === "ROLE_ADMIN") {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{user?._id}</td>
                                                                        <td>{user?.firstName} {user?.lastName}</td>
                                                                        <td className="lowercase">{user?.email}</td>
                                                                        <td className="bg-green-500 text-white font-medium text-xl rounded-full  h-2 py-2 px-8">{user?.isActivated  === true ? `approved` : `pending`}</td>
                                                                    </tr>
                                                                );
                                                            };
                                                        })
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </aside>

                                <aside className={`right-pane bg-red-500 ${activeDisplay === "staffs" ? "block" : "hidden" }`}>
                                    <table className="table-fixed capitalize">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>E-MAIL</th>
                                                <th>STATUS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            {
                                                users.map((user) => {
                                                    return (
                                                        user?.roles?.map((roleStaff) => {
                                                            if (roleStaff?.role === "ROLE_EDITOR") {
                                                                return (
                                                                    <>
                                                                        <td>{user?._id}</td>
                                                                        <td>{user?.firstName} {user?.lastName}</td>
                                                                        <td className="lowercase">{user?.email}</td>
                                                                        <td className="bg-green-500 text-white font-medium text-xl rounded-full h-8 py-2 px-8">{user?.isActivated  === true ? `approved` : `pending`}</td>
                                                                    </>
                                                                );
                                                            };
                                                        })
                                                    );
                                                })
                                            }
                                            </tr>
                                        </tbody>
                                    </table>
                                </aside>
                            </div>
                        </div>
                    </main>
                )
            }
        </>
    );
};


export default AdminDashboard;
