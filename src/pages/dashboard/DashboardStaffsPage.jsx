import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { adminDashboardIcon, brandOfficialLogo } from "../../assets/images";
import { HomeIcon, LogOutIcon, StaffsIcon, UsersIcon } from "../../assets/icons";







const DashboardStaffsPage = ({ isLoggedIn }) => {
    
    
    // *******************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // *******************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("staffs");
    // *******************************************************************
    // *******************************************************************
    

    // *********************************************
    // FUNCTION TO LOG-OUT LOGGED-IN USER
    // *********************************************
    function logOut() {
        localStorage.clear();
        const redirToLogin = "/user/login";
        window.location = redirToLogin;
    }
    // *********************************************
    // *********************************************


    // ***********************************************
    // CURRENTLY ACTIVE USER:-
    // ***********************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // *********************************************
    // *********************************************
    

    // ***********************************************
    // SET PAGE TITLE IF USER IS LOGGED-IN:-
    // ***********************************************
    useEffect(() => {
        if (isLoggedIn) {
            const pageTitle = "Reaching out to great minds", 
                siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;

            var adminRoot = document.querySelector("#root");
            adminRoot?.classList.add("admin__dashboard");
        };
    }, [isLoggedIn]);
    // *********************************************
    // *********************************************


    // *********************************************
    // DESTRUCTURE CURRENTLY ACTIVE USER:-
    // *********************************************
    const userName = isLoggedIn?.username ? isLoggedIn?.username : logOut();
    const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();


    // ************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ************************************
    const [users, setUsers] = useState([]);
 

    // *********************************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL USERS, IF "activeDisplay" is STAFFS
    // *********************************************************************************************
    useEffect(() => {      
        function findAllUsers() {
            const url = "http://127.0.0.1:8000/api/v1/admin/users/manage";
            axios.get(url)
            .then((response) => {
                const { success, data, message } = response.data;
                if (activeDisplay === "staffs") {
                    if ((!success) || (message === "Users not found")) {
                        console.log("Message: ", message);
                        console.log("Success: ", success);
                    };
                                
                    // Perform Actions Here if Truthy
                    setUsers(data);
                };
            })
            .catch((error) => {
                // Handle error state or logging here
                console.log("Error encountered: ", error);
            })
            .finally(() => {
                setIsLoading(false);    // Always disable loading state, whether successful or not
            });
        };
        
        var timerID = setTimeout(findAllUsers, 300);   // Delay execution of findAllUsers by 1800ms
        return () => {
            // Clean up timer if component unmounts or token changes
            clearTimeout(timerID);
        };
    }, [activeDisplay]);
    // *******************************************************************************************//
    // *******************************************************************************************//


    // *******************************************************************************************//
    // TOGGLE DROPDOWN: USER "Profile Image" MENU
    // *******************************************************************************************//
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
    // *******************************************************************************************//
    // TOGGLE DROPDOWN: USER/STAFF
    // *******************************************************************************************//
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
    function toggleStaffsView() {
        let toggleStaffMenu = document.querySelector('.staffsDropdown');
        if (toggleStaffMenu?.classList.contains("hidden")) {
            toggleStaffMenu?.classList.remove('hidden');
            toggleStaffMenu?.classList.add('flex');
        } else {
            toggleStaffMenu?.classList.remove('flex');
            toggleStaffMenu?.classList.add('hidden');
        };
    };
    // *******************************************************************************************//
    // *******************************************************************************************//


    
    if (isLoading) {
        return (
            <>
                <main id="dashboardStaffsID" className="admin-dashboard">
                    <div className="container flex admin-container">
                        <div className="h-screen w-full grid xs:grid-cols-26">
                            {/*******************************************************************/
                            /************************  DASHBOARD: Menu  ************************/
                            /*******************************************************************/}
                            <section className="flex flex-col gap-24 items-center h-full w-full px-0 relative left-pane bg-skin-darkblue z-50">         
                                <Link to={"/"} className="pt-1.5 w-full flex justify-center bg-white sticky top-0 brand">
                                    <img src={brandOfficialLogo} alt="official logo" />
                                </Link>

                                <ul className="flex flex-col w-full px-8 gap-16 mb-40">
                                    {/* MAIN MENU */}
                                    <div id="mainMenuId">
                                        <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Main Menu</small>
                                        <div className="flex flex-col gap-8">
                                            <Link to="/admin/dashboard/" className="no-dropdown">
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
                                                <div className="hidden flex-col gap-4 px-15.9 usersDropdown">
                                                    <Link to="/admin/users">user management</Link>
                                                </div>
                                            </div>
                                            {/* flex flex-col gap-4  */}
                                            <div className="dropdown">
                                                <button className="dropdown-toggle" type="button" onClick={toggleStaffsView}>
                                                    <StaffsIcon /> <span>staffs</span>
                                                </button>
                                                <div className="hidden flex-col gap-4 px-15.9 staffsDropdown">
                                                    <Link to="/admin/staffs" >staff management</Link>
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
                            <aside className={`${activeDisplay === "staffs" ? "block" : "hidden" }`}>
                                <div className="right-top-pane h-114.8 grid sticky top-0 bg-white z-50">
                                    <div className="flex justify-between items-center h-full flex-row px-10">
                                        <div className="rt-left-pane">
                                            <h1>Welcome 
                                                <strong className="capitalize text-black"> {userName}</strong>
                                            </h1>
                                        </div>
                                        <div className="flex flex-row gap-8 items-center h-full rt-right-pane relative">
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
                                                                    <span>Unassigned Role</span>
                                                                );
                                                            };
                                                        })
                                                    }
                                                </h6>
                                            </div>
                                            <div className="flex flex-col gap-4 dropdown h-20 relative top-0 left-0 user-profile-img">
                                                <button onClick={toggleUserProfileMenu} className="dropbtn absolute top-0">
                                                    <img src={adminDashboardIcon} alt={`${adminDashboardIcon}`} />
                                                </button>                                                                                                       
                                                <div className="hidden flex-col items-start w-72 min-h-24 bg-white shadow-lg rounded-lg relative top-20 -left-52 upm">
                                                    <Link className="px-6.4 pt-9 pb-11 w-full text-start text-41xl capitalize font-medium flex flex-row items-center gap-2" to="/admin/dashboard?logout" onClick={logOut}><LogOutIcon /> sign out</Link>
                                                </div>           
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                                {/*********************   SECTION BODY STARTS HERE   *******************/}

                                <div className="right-bottom-pane relative h-full flex flex-col">
                                    <table className="table-fixed capitalize">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>NAME</th>
                                                <th>E-MAIL</th>
                                                <th>STATUS</th>
                                                <th>ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((user) => {
                                                    if (!user?.isActivated && user?.approvalTandC) {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if (roleUsers?.role === "ROLE_ADMIN") {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{user?._id}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-orange-500">pending</td>
                                                                            <td>
                                                                                <Link to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    } else if (!user?.isActivated && !user?.approvalTandC) {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if (roleUsers?.role === "ROLE_ADMIN") {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{user?._id}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-red-500">failed</td>
                                                                            <td>
                                                                                <Link to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    } else {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if (roleUsers?.role === "ROLE_ADMIN") {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{user?._id}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-green-500">approved</td>
                                                                            <td>
                                                                                <Link to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    };
                                                })
                                            }
                                        </tbody>
                                    </table>
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


    return (
        <>
            <main id="dashboardStaffsID" className="admin-dashboard">
                <div className="container flex admin-container">
                    <div className="h-screen w-full grid xs:grid-cols-26">
                        {/*******************************************************************/
                        /************************  DASHBOARD: Menu  ************************/
                        /*******************************************************************/}
                        <section className="flex flex-col gap-24 items-center h-full w-full px-0 relative left-pane bg-skin-darkblue z-50">         
                            <Link to={"/"} className="pt-1.5 w-full flex justify-center bg-white sticky top-0 brand">
                                <img src={brandOfficialLogo} alt="official logo" />
                            </Link>

                            <ul className="flex flex-col w-full px-8 gap-16 mb-40">
                                {/* MAIN MENU */}
                                <div id="mainMenuId">
                                    <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Main Menu</small>
                                    <div className="flex flex-col gap-8">
                                        <Link to="/admin/dashboard/" className="no-dropdown">
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
                                            <div className="hidden flex-col gap-4 px-15.9 usersDropdown">
                                                <Link to="/admin/users">user management</Link>
                                            </div>
                                        </div>
                                        {/* flex flex-col gap-4  */}
                                        <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" onClick={toggleStaffsView}>
                                                <StaffsIcon /> <span>staffs</span>
                                            </button>
                                            <div className="hidden flex-col gap-4 px-15.9 staffsDropdown">
                                                <Link to="/admin/staffs" >staff management</Link>
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
                        <aside className={`${activeDisplay === "staffs" ? "block" : "hidden" }`}>
                            <div className="right-top-pane h-114.8 grid sticky top-0 bg-white z-50">
                                <div className="flex justify-between items-center h-full flex-row px-10">
                                    <div className="rt-left-pane">
                                        <h1>Welcome 
                                            <strong className="capitalize text-black"> {userName}</strong>
                                        </h1>
                                    </div>
                                    <div className="flex flex-row gap-8 items-center h-full rt-right-pane relative">
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
                                                                <span>Unassigned Role</span>
                                                            );
                                                        };
                                                    })
                                                }
                                            </h6>
                                        </div>
                                        <div className="flex flex-col gap-4 dropdown h-20 relative top-0 left-0 user-profile-img">
                                            <button onClick={toggleUserProfileMenu} className="dropbtn absolute top-0">
                                                <img src={adminDashboardIcon} alt={`${adminDashboardIcon}`} />
                                            </button>                                                                                                       
                                            <div className="hidden flex-col items-start w-72 min-h-24 bg-white shadow-lg rounded-lg relative top-20 -left-52 upm">
                                                <Link className="px-6.4 pt-9 pb-11 w-full text-start text-41xl capitalize font-medium flex flex-row items-center gap-2" to="/admin/dashboard?logout" onClick={logOut}><LogOutIcon /> sign out</Link>
                                            </div>           
                                        </div>
                                    </div>
                                </div>
                            </div>
                            

                            {/*********************   SECTION BODY STARTS HERE   *******************/}

                            <div className="right-bottom-pane relative h-full flex flex-col">
                                <table className="table-fixed capitalize">
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th>NAME</th>
                                            <th>E-MAIL</th>
                                            <th>STATUS</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user) => {
                                                if (!user?.isActivated && user?.approvalTandC) {
                                                    return (
                                                        user?.roles?.map((roleUsers, index) => {
                                                            if (roleUsers?.role === "ROLE_ADMIN") {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{user?._id}</td>
                                                                        <td>{user?.firstName} {user?.lastName}</td>
                                                                        <td className="lowercase">{user?.email}</td>
                                                                        <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-orange-500">pending</td>
                                                                        <td>
                                                                            <Link to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            };
                                                        })
                                                    );
                                                } else if (!user?.isActivated && !user?.approvalTandC) {
                                                    return (
                                                        user?.roles?.map((roleUsers, index) => {
                                                            if (roleUsers?.role === "ROLE_ADMIN") {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{user?._id}</td>
                                                                        <td>{user?.firstName} {user?.lastName}</td>
                                                                        <td className="lowercase">{user?.email}</td>
                                                                        <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-red-500">failed</td>
                                                                        <td>
                                                                            <Link to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            };
                                                        })
                                                    );
                                                } else {
                                                    return (
                                                        user?.roles?.map((roleUsers, index) => {
                                                            if (roleUsers?.role === "ROLE_ADMIN") {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{user?._id}</td>
                                                                        <td>{user?.firstName} {user?.lastName}</td>
                                                                        <td className="lowercase">{user?.email}</td>
                                                                        <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-green-500">approved</td>
                                                                        <td>
                                                                            <Link to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            };
                                                        })
                                                    );
                                                };
                                            })
                                        }
                                    </tbody>
                                </table>
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


export default DashboardStaffsPage;
