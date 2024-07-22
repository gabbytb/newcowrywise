import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { adminDashboardIcon, brandOfficialLogo } from "../../../assets/images";
import { HomeIcon, LogOutIcon, StaffsIcon, UsersIcon } from "../../../assets/icons";
import DashboardStaffsApprovedPage from "./DashboardStaffsApprovedPage";
import DashboardStaffsPendingPage from "./DashboardStaffsPendingPage";









const DashboardStaffsPage = ({ isLoggedIn }) => {
    

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
    const [activeDisplay, setActiveDisplay] = useState('allStaffs');
    const [isLoading, setIsLoading] = useState(true);
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
    const userName = isLoggedIn?.username ? isLoggedIn?.username : logOut();
    const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ****************************************************************************
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalUsers, setTotalUsers] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    
    const [currentPendingPage, setCurrentPendingPage] = useState(1);
    const [currentFailedPage, setCurrentFailedPage] = useState(1);
    const limit = 10; // Number of items per page

     

        
    
    useEffect(() => {
        if (activeDisplay === "allPendingStaffs") {
            var timerID = setTimeout(fetchPendingStaffs, 300);   // Delay execution of findAllApprovedUsers by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        }
    }, [activeDisplay, currentPendingPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL "PENDING" STAFFS
    // ****************************************************************************
    async function fetchPendingStaffs() {
        const pendingStatus = "pending";
        await axios.get(`http://127.0.0.1:8000/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}&status=${pendingStatus}`)
        .then((response) => {
            const { success, data, message } = response.data;
            const { accountList, pagination } = data;

            if (!success && message === "No admin found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setUsers(accountList)
            setTotalPages(pagination?.lastPage);
            setTotalUsers(pagination?.adminRecords);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };
    // ****************************************************************************
    // ****************************************************************************
    const handlePendingPageChange = (pagePending) => {
        setCurrentPendingPage(pagePending);
    };    
    // ****************************************************************************
    // ****************************************************************************




    useEffect(() => {
        if (activeDisplay === "allFailedStaffs") {
            var timerID = setTimeout(fetchFailedStaffs, 300);   // Delay execution of findAllApprovedUsers by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        }
    }, [activeDisplay, currentFailedPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL "FAILED" STAFFS
    // ****************************************************************************
    async function fetchFailedStaffs() {
        const failedStatus = "failed";
        await axios.get(`http://127.0.0.1:8000/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}&status=${failedStatus}`)
        .then((response) => {
            const { success, data, message } = response.data;
            const { accountList, pagination } = data;

            if (!success && message === "No admin found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setUsers(accountList)
            setTotalPages(pagination?.lastPage);
            setTotalUsers(pagination?.adminRecords);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };
    // ****************************************************************************
    // ****************************************************************************    
    const handleFailedPageChange = (pageFailed) => {
        setCurrentFailedPage(pageFailed);
    };
    // ****************************************************************************
    // ****************************************************************************
        


    useEffect(() => {
        if (activeDisplay === "allStaffs") {
            var timerID = setTimeout(fetchAllStaffs, 300);   // Delay execution of findAllUsers by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        }
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL STAFFS
    // ****************************************************************************             
    async function fetchAllStaffs() {
    //   try {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}`);
    //     // const { success, data, message } = response.data;
    //     // if ((!success) && (message === "Users not found")) {
    //     //     
    //     // } 
    //     const { accountList, totalPages } = response.data;

    //     setUsers(accountList);
    //     setTotalPages(totalPages);

    //     setIsLoading(false);

    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   };

        await axios.get(`http://127.0.0.1:8000/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}`)
        .then((response) => {
            const { success, data, message } = response.data;
            const { accountList, pagination } = data;

            if (!success && message === "No admin found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setUsers(accountList)
            setTotalPages(pagination?.lastPage);
            setTotalUsers(pagination?.adminRecords);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };
    // ****************************************************************************
    // ****************************************************************************
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
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
    // TOGGLE DROPDOWN: USER/STAFF
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
    // ****************************************************************************
    // ****************************************************************************


    
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
                                
    
    


                                {/*********************   ASIDE BODY BOTTOM STARTS HERE   *******************/}
                                <div className={`right-bottom-pane relative h-full flex-col ${activeDisplay === 'allStaffs' ? 'flex' : 'hidden'}`}>
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
                                                    if (user?.status === "pending") {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{user?._id}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-orange-500">{user?.status}</td>
                                                                            <td>
                                                                                <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    } else if (user?.status === "failed") {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{user?._id}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-red-500">{user?.status}</td>
                                                                            <td>
                                                                                <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    } else {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{user?._id}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-green-500">{user?.status}</td>
                                                                            <td>
                                                                                <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
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
    

    
                                    {/* Pagination controls */}
                                    <div className="flex justify-center mt-4">
                                        <nav className="relative z-0 inline-flex shadow-sm">
                                        {/* Previous page button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={currentPage === 1}
                                        >
                                            Prev
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
                                        >
                                            Next
                                        </button>
                                        </nav>
                                    </div>
                                    {/* Pagination controls */}
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
                            




                            {/*********************   ASIDE BODY BOTTOM STARTS HERE   *******************/}
                            <div className="right-bottom-pane relative h-full flex flex-col px-12">
                                <div className="flex flex-row gap-3 mt-4 mb-10">
                                    <Link onClick={() => setActiveDisplay("allStaffs")}>All</Link>
                                    <Link onClick={() => setActiveDisplay("allApprovedStaffs")}>Approved</Link>
                                    <Link onClick={() => setActiveDisplay("allPendingStaffs")}>Pending</Link>
                                    <Link onClick={() => setActiveDisplay("allFailedStaffs")}>Failed</Link>
                                </div>


                                <div className={`capitalize border ${activeDisplay === "allStaffs" ? "grid" : "hidden"}`}>
                                    <table className="table-fixed capitalize w-full border staff__table">
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>NAME</th>
                                                <th>E-MAIL ADDRESS</th>
                                                <th className="text-center">STATUS</th>
                                                <th className="text-center">ACTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map((user, userIndex) => {
                                                    if (user?.status === "pending") {
                                                        return (
                                                            user?.roles?.map((roleUsers) => {
                                                                if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                                    return (
                                                                        <tr key={userIndex}>
                                                                            <td>{userIndex+1}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-orange-500">{user?.status}</td>
                                                                            <td>
                                                                                <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    } else if (user?.status === "failed") {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index+1}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-red-500">{user?.status}</td>
                                                                            <td>
                                                                                <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    } else {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index+1}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-green-500">{user?.status}</td>
                                                                            <td>
                                                                                <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
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



                                    {/* Pagination controls */}
                                    <div className="flex justify-between">
                                        <div className="border-e-2 border-gray-200/50 p-4 font-black text-42xl font-firma tracking-supertight">
                                            {limit}
                                        </div>
                                        <nav className="relative z-0 inline-flex shadow-sm">
                                            {/* Previous page button */}
                                            <button
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={currentPage === 1}
                                            >
                                                Prev
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
                                            >
                                                Next
                                            </button>
                                        </nav>
                                    </div>
                                    {/* Pagination controls */}
                                </div>
                                
                                <DashboardStaffsApprovedPage activeDisplay={activeDisplay} />

                                <DashboardStaffsPendingPage activeDisplay={activeDisplay} />

                                {/* <DashboardStaffsFailedPage
                                   activeDisplay={activeDisplay}
                                /> */}
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
