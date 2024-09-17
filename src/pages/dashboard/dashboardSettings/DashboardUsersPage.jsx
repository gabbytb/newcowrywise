import { lazy, Suspense, useEffect, useState, } from "react";
import { Link, } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import api from "../../../api";

import { adminDashboardIcon, brandOfficialLogo } from "../../../assets/images";
import { HomeIcon, LogOutIcon, StaffsIcon, UsersIcon } from "../../../assets/icons";

// import ApprovedUsersPage from "./users/ApprovedUsersPage";
// import PendingUsersPage from "./users/PendingUsersPage";
// import RejectedUsersPage from "./users/RejectedUsersPage";

const ApprovedUsersPage = lazy(() => import("./users/ApprovedUsersPage"));
const PendingUsersPage = lazy(() => import("./users/PendingUsersPage"));
const RejectedUsersPage = lazy(() => import("./users/RejectedUsersPage"));







const DashboardUsersPage = ({ isLoggedIn }) => {
    
    
    // console.clear();
    
    
    // ****************************************************************************
    // SET PAGE TITLE && ADD CUSTOM "admin__dashboard" CLASS TO ADMIN DASHBOARD
    // ****************************************************************************
    useEffect(() => {
        var pageTitle = "Reaching out to great minds", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;

        var adminRoot = document.querySelector("#root");
        adminRoot?.classList.add("admin__dashboard");
    }, []);
    // ****************************************************************************
    // ****************************************************************************


    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [activeDisplay, setActiveDisplay] = useState("allUsers");
    
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);
    // ****************************************************************************
    // ****************************************************************************
    

    // ****************************************************************************
    // CURRENTLY ACTIVE USER:-
    // ****************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // ****************************************************************************
    // FUNCTION TO LOG-OUT LOGGED-IN USER
    // ****************************************************************************
    function logOut() {
        // Clear User Details from Local Storage
        localStorage.clear();
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        const redirToLOGIN = "/user/login";
        window.location.replace(redirToLOGIN);
    };
    // ****************************************************************************
    // DESTRUCTURE CURRENTLY ACTIVE USER:-
    // ****************************************************************************
    // const userName = isLoggedIn?.userName ? isLoggedIn?.userName : logOut();
    const lastName = isLoggedIn?.lastName ? isLoggedIn?.lastName : logOut();
    const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    // ****************************************************************************
    // ****************************************************************************   

    
    // ****************************************************************************
    // TOGGLE DROPDOWN: USER "Profile Image" MENU
    // ****************************************************************************
    function toggleUserProfileMenu() {       
        const userDpMenu = document.querySelector('.upm');
        if (userDpMenu?.classList.contains("hidden")) {
            userDpMenu?.classList.remove('hidden');
            userDpMenu?.classList.add('flex');
        } else {
            userDpMenu?.classList.remove('flex');
            userDpMenu?.classList.add('hidden');
        };
    };
    // ****************************************************************************
    // TOGGLE DROPDOWN: USER/STAFF MENU
    // ****************************************************************************
    function toggleUsersMenu() {
        let toggleUserMenu = document.querySelector('.usersDropdown');
        if (toggleUserMenu?.classList.contains("flex") ) {
            toggleUserMenu?.classList.remove('flex');
            toggleUserMenu?.classList.add('hidden');
        } else {
            toggleUserMenu?.classList.remove('hidden');
            toggleUserMenu?.classList.add('flex');
        };
    };
    function toggleStaffsMenu() {
        let toggleStaffMenu = document.querySelector('.staffsDropdown');
        if (toggleStaffMenu?.classList.contains("hidden")) {
            toggleStaffMenu?.classList.remove('hidden');
            toggleStaffMenu?.classList.add('flex');
        } else {
            toggleStaffMenu?.classList.remove('flex');
            toggleStaffMenu?.classList.add('hidden');
        };
    };
    // ****************************************************************************
    // ****************************************************************************


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ****************************************************************************
    const [allUsers, setAllUsers] = useState([]);
    // console.log("ALL USERS: ", allUsers);
      
    // eslint-disable-next-line
    const [totalUsers, setTotalUsers] = useState(null);
    // console.log("TOTAL USERS: ", totalUsers);
    const [totalPages, setTotalPages] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Number of items per page
    const leftArrow = "<", rightArrow = ">";


    useEffect(() => {
        var allUsersLink = document.querySelector("#usersLinkID .allUsers");
        // console.log("ALL USERS LINK", allUsersLink);
        if (activeDisplay === "allUsers") {
            allUsersLink?.classList.add("activeUserView");
        } else {
            allUsersLink?.classList.remove("activeUserView");
        };
    }, [activeDisplay]);

    
    useEffect(() => {
        if (activeDisplay === "allUsers") {
            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL USERS
            // ****************************************************************************             
            async function fetchAllUsers() {
                await api.get(`/api/v1/auth/account/by-role/ROLE_USERS?page=${currentPage}&limit=${limit}`)
                .then((response) => {
                    const { success, data, message } = response.data;
                    const { usersList, pagination } = data;

                    if (!success && message === "No user found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setAllUsers(usersList);
                
                    setTotalUsers(pagination?.usersRecord);
                    setTotalPages(pagination?.lastPage);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            };

            var timerID = setTimeout(fetchAllUsers, 300);   // Delay execution of findAllUsers by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        };
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // **************************************************************************** 
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************





    return (
        <main id="dashboardStaffsID" className="admin-dashboard">
            <div className="container flex admin-container">
                <div className="h-full w-full grid xs:grid-cols-26">
                    {/*******************************************************************/
                    /************************  DASHBOARD: Menu  ************************/
                    /*******************************************************************/}
                    <section className="flex flex-col gap-24 items-center h-full w-full px-0 relative left-pane bg-skin-darkblue z-50">         
                        <Link to={"/"} className="pt-1.5 w-full flex justify-center bg-white sticky top-0 brand">
                            <img src={brandOfficialLogo} alt="official logo" />
                        </Link>

                        {/* mb-40 */}
                        <ul className="flex flex-col w-full px-8 gap-16 overflow-y-auto h-screen">
                            {/* MAIN MENU: DASHBOARD */}
                            <div id="mainMenuId">
                                <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Main Menu</small>
                                <div className="flex flex-col gap-8">
                                    <Link to="/admin/dashboard" className="no-dropdown">
                                        <HomeIcon /> <span>Dashboard</span>
                                    </Link>
                                </div>
                            </div>
                            {/* MAIN MENU */}



                            {/* SETTINGS MENU: USERS & ADMINS */}
                            <div id="userMenuId">
                                <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Settings</small>
                                <div className="flex flex-col gap-8">
                                    <div className="dropdown">
                                        <button className="dropdown-toggle" type="button" onClick={toggleUsersMenu}>
                                            <UsersIcon /> <span>users</span>
                                        </button>
                                        <div className="flex flex-col gap-4 px-15.9 usersDropdown">
                                            <Link to={"/admin/users"}>user management</Link>
                                        </div>
                                    </div>
                                    {/* flex flex-col gap-4  */}
                                    <div className="dropdown">
                                        <button className="dropdown-toggle" type="button" onClick={toggleStaffsMenu}>
                                            <StaffsIcon /> <span>staffs</span>
                                        </button>
                                        <div className="hidden flex-col gap-4 px-15.9 staffsDropdown">
                                            <Link to={"/admin/staffs"}>staff management</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* SETTINGS MENU */}
                        </ul>
                    </section>
                    {/*******************************************************************/
                    /************************  DASHBOARD: Menu  ************************/
                    /*******************************************************************/}



                    {/******************************************************************************************/}
                    {/*******************************    SETTINGS:- Users VIEW    ******************************/}
                    {/******************************************************************************************/}
                    <aside className="block">

                        {/*********************   ASIDE BODY TOP STARTS HERE   *******************/}
                        {/* sticky top-0 */}
                        <div className="right-top-pane h-114.8 grid sticky top-0 bg-white z-50">
                            <div className="flex justify-between items-center h-full flex-row px-10">
                                
                                
                                <div className="rt-left-pane">
                                    <h1>Welcome 
                                        <strong className="capitalize text-black"> {lastName}</strong>
                                    </h1>
                                </div>
                                



                                <div className="rt-right-pane flex flex-row items-center gap-8 h-full relative">
                                    <div className="user-info">
                                        <h4>{userEmail}</h4>
                                        <h6>
                                            {
                                                userRoles?.map((selectRole) => {
                                                    if (selectRole?.role === "ROLE_ADMIN") {
                                                        return (
                                                            <span key={selectRole?._id}>admin</span>
                                                        );
                                                    } else if (selectRole?.role === "ROLE_EDITOR") {
                                                        return (
                                                            <span key={selectRole?._id}>editor</span>
                                                        );
                                                    } else if (selectRole?.role === "ROLE_STAFF") {
                                                        return (
                                                            <span key={selectRole?._id}>staff</span>
                                                        );
                                                    } else if (selectRole?.role === "ROLE_USERS") {
                                                        return (
                                                            <span key={selectRole?._id}>user</span>
                                                        );
                                                    } else {
                                                        return (
                                                            <span><strong>Alert:</strong> User has not been assigned Role</span>
                                                        );
                                                    };
                                                })
                                            }
                                        </h6>
                                    </div>
                                    <div className="user-profile-img dropdown flex flex-col gap-4 h-20 relative top-0 left-0">
                                        <button onClick={toggleUserProfileMenu} className="dropbtn absolute top-0">
                                            <img src={adminDashboardIcon} alt={`${adminDashboardIcon}`} />
                                        </button>                                                                                                       
                                        <div className="hidden flex-col items-start w-72 min-h-24 bg-white shadow-lg rounded-lg relative z-50 top-20 -left-52 upm">
                                            <Link className="px-6.4 pt-9 pb-11 w-full text-start text-41xl capitalize font-medium flex flex-row items-center gap-2" to="/admin/dashboard?logout" onClick={logOut}><LogOutIcon /> sign out</Link>
                                        </div>           
                                    </div>
                                </div>


                            </div>
                        </div>
                        




                        {/*********************   ASIDE BODY BOTTOM STARTS HERE   *******************/}
                        <div className="right-bottom-pane relative h-full flex flex-col px-12">
                            
                            {/* Users Navigation */}
                            <div id="usersLinkID" className="flex flex-row gap-3 mt-4 mb-10">
                                <Link className="allUsers activeUserView" onClick={() => setActiveDisplay("allUsers")}>All</Link>
                                <Link className="allApprovedUsers" onClick={() => setActiveDisplay("allApprovedUsers")}>Approved</Link>
                                <Link className="allPendingUsers" onClick={() => setActiveDisplay("allPendingUsers")}>Pending</Link>
                                <Link className="allRejectedUsers" onClick={() => setActiveDisplay("allRejectedUsers")}>Rejected</Link>
                            </div>
                            {/* Users Navigation */}



                            {/*********** Page Title Wrapper ***********/}
                            <div className="mt-10 mb-8 font-black text-3xl tracking-supertight">
                                <h2 className="capitalize">all users</h2>
                            </div>
                            {/*********** Page Title Wrapper ***********/}


                            
                            {/***********  Views  ***********/}                                               
                            <div className={`capitalize border ${activeDisplay === "allUsers" ? "grid" : "hidden"}`}>
                                <table className="table-fixed capitalize w-full border staff__table">
                                        <thead>
                                            <tr className="text-left">
                                                <th className="w-12 h-16 px-3 py-3">ID</th>
                                                <th className="w-40 px-3 py-3">NAME</th>
                                                <th className="w-60 px-3 py-3">E-MAIL ADDRESS</th>
                                                <th className="w-40 px-3 py-3 text-center">STATUS</th>
                                                <th className="w-40 px-3 py-3 text-center">ACTION</th>
                                            </tr>
                                        </thead>
                                        {
                                            allUsers?.length !== 0 ?
                                                <tbody>
                                                    {
                                                        allUsers?.map((user, userIndex) => {
                                                            if (user?.status === "pending") {
                                                                return (
                                                                    <tr key={userIndex} className="text-left">
                                                                        <td className="w-12 px-3 py-4 font-firma tracking-supertight">#{userIndex+1}</td>
                                                                        <td className="w-40 px-3 py-4">{user?.firstName} {user?.lastName}</td>
                                                                        <td className="w-60 px-3 py-4 lowercase font-bold">{user?.email}</td>
                                                                        <td className="w-40"><div className="text-center text-white font-medium text-lg rounded-full py-3 px-8 w-full bg-orange-500">{user?.status}</div></td>
                                                                        <td className="w-4/5 text-center flex justify-center mx-auto">
                                                                            <Link className="w-full text-slate-700 py-6" to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            } else if (user?.status === "rejected") {
                                                                return (
                                                                    <tr key={userIndex} className="text-left">
                                                                        <td className="w-12 px-3 py-4 font-firma tracking-supertight">#{userIndex+1}</td>
                                                                        <td className="w-40 px-3 py-4">{user?.firstName} {user?.lastName}</td>
                                                                        <td className="w-60 px-3 py-4 lowercase font-bold">{user?.email}</td>
                                                                        <td className="w-40"><div className="text-center text-white font-medium text-lg rounded-full py-3 px-8 w-full bg-red-500">{user?.status}</div></td>
                                                                        <td className="w-4/5 text-center flex justify-center mx-auto">
                                                                            <Link className="w-full text-slate-700 py-6" to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            } else {
                                                                return (
                                                                    <tr key={userIndex} className="text-left">
                                                                        <td className="w-12 px-3 py-4 font-firma tracking-supertight">#{userIndex+1}</td>
                                                                        <td className="w-40 px-3 py-4">{user?.firstName} {user?.lastName}</td>
                                                                        <td className="w-60 px-3 py-4 lowercase font-bold">{user?.email}</td>
                                                                        <td className="w-40"><div className="text-center text-white font-medium text-lg rounded-full py-3 px-8 w-full bg-green-500">{user?.status}</div></td>
                                                                        <td className="w-4/5 text-center flex justify-center mx-auto">
                                                                            <Link className="w-full text-slate-700 py-6" to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            };
                                                        })
                                                    }
                                                </tbody>
                                                :
                                                <tbody>
                                                    <tr className="h-32 mb-28">
                                                        <td className="w-20 h-16 text-center"></td>
                                                        <td className="text-center"></td>
                                                        <td className=" w-121 text-center uppercase font-medium text-lg tracking-supertight">
                                                            No record of user
                                                        </td>
                                                        <td className="text-center"></td>
                                                        <td className="text-center"></td>
                                                    </tr>
                                                </tbody>
                                        }
                                </table>


                                {/* Pagination controls */}
                                <div className="flex justify-between">
                                    <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                                        {limit} 
                                        <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
                                    </div>
                                    <nav className="relative z-0 inline-flex shadow-sm">
                                        {/* Previous page button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={currentPage === 1}
                                        >{leftArrow}
                                        </button>


                                        {/* Page numbers */}
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}>
                                            {index + 1}
                                            </button>
                                        ))}


                                        {/* Next page button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={currentPage === totalPages}
                                        >{rightArrow}
                                        </button>
                                    </nav>
                                </div>
                                {/* Pagination controls */}
                            </div>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ApprovedUsersPage activeDisplay={activeDisplay} />
                            </Suspense>
                            <Suspense fallback={<div>Loading...</div>}>                            
                                <PendingUsersPage activeDisplay={activeDisplay} />
                            </Suspense>
                            <Suspense fallback={<div>Loading...</div>}>
                                <RejectedUsersPage activeDisplay={activeDisplay} />
                            </Suspense>
                            {/***********  Views  ***********/}

                        </div>
                    </aside>
                    {/******************************************************************************************/}
                    {/******************************************************************************************/}
                </div>
            </div>
        </main>
    );
};


export default DashboardUsersPage;