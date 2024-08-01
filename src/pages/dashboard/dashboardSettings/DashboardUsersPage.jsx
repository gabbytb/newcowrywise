import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

import { adminDashboardIcon, brandOfficialLogo } from "../../../assets/images";
import { HomeIcon, LogOutIcon, StaffsIcon, UsersIcon } from "../../../assets/icons";

import AllUsersPage from "./users/AllUsersPage";
import ApprovedUsersPage from "./users/ApprovedUsersPage";
import PendingUsersPage from "./users/PendingUsersPage";
import RejectedUsersPage from "./users/RejectedUsersPage";









const DashboardUsersPage = ({ isLoggedIn }) => {
    

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
    // const [isLoading, setIsLoading] = useState(true);
    // ****************************************************************************
    // ****************************************************************************
    

    // ****************************************************************************
    // FUNCTION TO LOG-OUT LOGGED-IN USER
    // ****************************************************************************
    function logOut() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location = redirToLogin;
    }
    // ****************************************************************************
    // ****************************************************************************


    // ****************************************************************************
    // CURRENTLY ACTIVE USER:-
    // ****************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // ****************************************************************************
    // DESTRUCTURE CURRENTLY ACTIVE USER:-
    // ****************************************************************************
    // const userName = isLoggedIn?.userName ? isLoggedIn?.userName : logOut();
    const firstName = isLoggedIn?.firstName ? isLoggedIn?.firstName : logOut();
    const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();



    // async function filterUserByRoleFirst() {
    //     for (var i = 0; i < allUsers?.length; i++) {
    //         if (i < allUsers?.length) {
    //             console.log("USERS STATUS: ", allUsers[i].status);

    //             for (var n = 0; n < allUsers[i].roles.length; n++) {
    //                 if (n < allUsers[i].roles.length) {
    //                     console.log("USERS ROLE: ", allUsers[i].roles[n].role);
    //                     console.log("True: ", true);
    //                 } else {
    //                     console.log("False: ", false);
    //                 };
    //             };
    //         };
    //     }   
    // }
    // filterUserByRoleFirst();
    


    
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
        if (toggleUserMenu?.classList.contains("hidden") ) {
            toggleUserMenu?.classList.remove('hidden');
            toggleUserMenu?.classList.add('flex');
        } else {
            toggleUserMenu?.classList.remove('flex');
            toggleUserMenu?.classList.add('hidden');
        };
    };
    function toggleStaffsMenu() {
        let toggleStaffMenu = document.querySelector('.staffsDropdown');
        if (toggleStaffMenu?.classList.contains("flex")) {
            toggleStaffMenu?.classList.remove('flex');
            toggleStaffMenu?.classList.add('hidden');
        } else {
            toggleStaffMenu?.classList.remove('hidden');
            toggleStaffMenu?.classList.add('flex');
        };
    };
    // ****************************************************************************
    // ****************************************************************************


    return (
        <>
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
                                {/* MAIN MENU */}
                                <div id="mainMenuId">
                                    <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Main Menu</small>
                                    <div className="flex flex-col gap-8">
                                        <Link to="/admin/dashboard" className="no-dropdown">
                                            <HomeIcon /> <span>Dashboard</span>
                                        </Link>
                                    </div>
                                </div>
                                {/* MAIN MENU */}



                                {/* USERS MENU */}
                                <div id="userMenuId">
                                    <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Settings</small>
                                    <div className="flex flex-col gap-8">
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" onClick={toggleUsersMenu}>
                                                <UsersIcon /> <span>users</span>
                                            </button>
                                            <div className="flex flex-col gap-4 px-15.9 usersDropdown">
                                                <Link to="/admin/users">user management</Link>
                                            </div>
                                        </div>
                                        {/* flex flex-col gap-4  */}
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" onClick={toggleStaffsMenu}>
                                                <StaffsIcon /> <span>staffs</span>
                                            </button>
                                            <div className="hidden flex-col gap-4 px-15.9 staffsDropdown">
                                                <Link to="/admin/staffs">staff management</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* USERS MENU */}
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
                            <div className="right-top-pane h-114.8 grid bg-white z-50">
                                <div className="flex justify-between items-center h-full flex-row px-10">
                                    
                                    
                                    <div className="rt-left-pane">
                                        <h1>Welcome 
                                            <strong className="capitalize text-black"> {firstName}</strong>
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
                                            <div className="hidden flex-col items-start w-72 min-h-24 bg-white shadow-lg rounded-lg z-50 relative top-20 -left-52 upm">
                                                <Link className="px-6.4 pt-9 pb-11 w-full text-start text-41xl capitalize font-medium flex flex-row items-center gap-2" to={"/admin/dashboard?logout"} onClick={logOut}><LogOutIcon /> sign out</Link>
                                            </div>           
                                        </div>
                                    </div>


                                </div>
                            </div>
                            




                            {/*********************   ASIDE BODY BOTTOM STARTS HERE   *******************/}
                            <div className="right-bottom-pane relative h-full flex flex-col px-12">
                                


                                {/* Users Navigation */}
                                <div className="flex flex-row gap-3 mt-4 mb-10">
                                    <Link onClick={() => setActiveDisplay("allUsers")}>All</Link>
                                    <Link onClick={() => setActiveDisplay("allApprovedUsers")}>Approved</Link>
                                    <Link onClick={() => setActiveDisplay("allPendingUsers")}>Pending</Link>
                                    <Link onClick={() => setActiveDisplay("allRejectedUsers")}>Rejected</Link>
                                </div>
                                {/* Users Navigation */}


                                {/* Page Title Wrapper */}                
                                <div className="mt-10 mb-8 font-black text-3xl tracking-supertight">
                                    <h2 className="capitalize">all users</h2>
                                </div>
                                {/* Page Title Wrapper */}                




                                {/***********  Views  ***********/}
                                <AllUsersPage activeDisplay={activeDisplay} />
                                
                                <ApprovedUsersPage activeDisplay={activeDisplay} />

                                <PendingUsersPage activeDisplay={activeDisplay} />

                                <RejectedUsersPage activeDisplay={activeDisplay} />
                                {/***********  Views  ***********/}
                            </div>
                            
                        </aside>
                        {/******************************************************************************************/}
                        {/******************************************************************************************/}
                    </div>
                </div>
            </main>
        </>
    );

};


export default DashboardUsersPage;
