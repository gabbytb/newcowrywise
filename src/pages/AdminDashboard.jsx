import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { adminDashboardIcon, brandOfficialLogo } from "../assets/images";
import { HomeIcon, StaffsIcon, UsersIcon } from "../assets/icons";
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
    // *********************************************
    // *********************************************



    // *********************************************
    // DESTRUCTURE:-  (LOGGED-IN USER Props)
    // *********************************************
    const userName = isLoggedIn?.username ? isLoggedIn?.username : logOut();
    const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    // console.log("LOGGED-IN USER's Roles: ", userRoles);
    // const userAccessToken = isLoggedIn?.accessToken ? isLoggedIn?.accessToken : logOut();
    // console.log("LOGGED-IN USER's AccessToken: ", userAccessToken);



    // *******************************************************************
    // SPECIAL FEATURES
    // *******************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("home");
    // *******************************************************************
    // *******************************************************************



    // *******************************************************************************************//
    // USERS MENU: DropDown Controller
    // *******************************************************************************************//
    function usersDropdownFunction() {
        let usersDropDown = document.querySelector("#usersDropdown");
        // console.log('Users Dropdown: ', usersDropDown);    
        if (usersDropDown?.classList.contains('hidden')) {
            usersDropDown?.classList.remove('hidden');
            usersDropDown?.classList.add('flex');
        } else {
            usersDropDown?.classList.remove('flex');
            usersDropDown?.classList.add('hidden');
        };
    };
    function adminsDropdownFunction() {
        let adminsDropDown = document.querySelector("#adminsDropdown");
        // console.log('Admins Dropdown: ', adminsDropDown);
        if (adminsDropDown?.classList.contains('hidden')) {
            adminsDropDown?.classList.remove('hidden');
            adminsDropDown?.classList.add('flex');
        } else {
            adminsDropDown?.classList.remove('flex');
            adminsDropDown?.classList.add('hidden');
        };
    };
    // *******************************************************************
    // *******************************************************************



    async function toggleProfileImgMenu() {       
        var userProfileImgDropDown = document.querySelector('#adminDashboardID .lp');
        // console.log('Admins Dropdown: ', userProfileImgDropDown);
        if (userProfileImgDropDown?.classList.contains("hidden")) {
            userProfileImgDropDown?.classList.remove('hidden');
            userProfileImgDropDown?.classList.add('flex');
        } else {
            userProfileImgDropDown?.classList.remove('flex');
            userProfileImgDropDown?.classList.add('hidden');
        };
    };

    // *******************************************************************************************//
    // *******************************************************************************************//




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


                                {/*******************************************************************/
                                /***********************  CONTROLLER: Menu  ************************/
                                /*******************************************************************/}
                                <section className="flex flex-col gap-24 items-center h-full w-full px-0 relative left-pane bg-skin-darkblue">         
                                    <Link to={"/"} className="pt-1.5 w-full flex justify-center bg-white sticky top-0 brand">
                                        <img src={brandOfficialLogo} alt="official logo" />
                                    </Link>

                                    <ul className="flex flex-col w-full px-8 gap-16">
                                        {/* MAIN MENU */}
                                        <div id="mainMenuId">
                                            <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Main Menu</small>
                                            <div className="flex flex-col gap-8">
                                                <Link to="#" onClick={(e) => setActiveDisplay("home")} className="no-dropdown">
                                                    <HomeIcon /> <span>Dashboard</span>
                                                </Link>
                                            </div>
                                        </div>
                                        {/* MAIN MENU */}



                                        {/* USERS MENU */}
                                        <div id="userMenuId">
                                            <small className="text-slate-300 text-xl tracking-moretight font-bold mb-6 uppercase flex w-full">Settings</small>
                                            <div className="flex flex-col gap-8">
                                                <div className="flex flex-col gap-4 dropdown">
                                                    <button onClick={usersDropdownFunction} className="dropbtn">
                                                        <UsersIcon /> <span>users</span>
                                                    </button>
                                                    <div id="usersDropdown" className="hidden flex-col gap-4 px-15.9">
                                                        <Link to="#" onClick={(e) => setActiveDisplay("users")}>user management</Link>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4 dropdown">
                                                    <button onClick={adminsDropdownFunction} className="dropbtn">
                                                        <StaffsIcon /> <span>staffs</span>
                                                    </button>
                                                    <div id="adminsDropdown" className="hidden flex-col gap-4 px-15.9">
                                                        <Link to="#" onClick={(e) => setActiveDisplay("admins")}>staff management</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* USERS MENU */}
                                    </ul>
                                </section>
                                {/*******************************************************************/
                                /***********************  CONTROLLER: Menu  ************************/
                                /*******************************************************************/}





                                {/*******************************************************************/
                                /****************************   VIEWS   ****************************/
                                /*******************************************************************/}
                                <aside className={`${activeDisplay === "home" ? "block" : "hidden" }`}>
                                    <div className="right-top-pane h-114.8 grid sticky top-0 bg-white">
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
                                                                }
                                                            })
                                                        }
                                                    </h6>
                                                </div>
                                                <div className="flex flex-col gap-4 dropdown h-20 relative top-0 left-0 user-profile-img">
                                                    <button onClick={toggleProfileImgMenu} className="dropbtn absolute top-0">
                                                        <img src={adminDashboardIcon} alt={`${adminDashboardIcon}`} />
                                                    </button>                                                                                                       
                                                    <div className="flex-col items-start gap-4 w-72 min-h-48 py-6 px-6.4 shadow-lg rounded-lg relative top-20 -left-52 hidden lp">
                                                        <button to="#" onClick={logOut}>sign out</button>
                                                    </div>            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-bottom-pane">
                                        
                                    </div>
                                </aside>

                                
                                <aside className={`${activeDisplay === "users" ? "block" : "hidden" }`}>
                                    <div className="right-top-pane h-114.8 grid sticky top-0 bg-white">
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
                                                                }
                                                            })
                                                        }
                                                    </h6>
                                                </div>
                                                <div className="flex flex-col gap-4 dropdown h-20 relative top-0 left-0 user-profile-img">
                                                    <button onClick={toggleProfileImgMenu} className="dropbtn absolute top-0">
                                                        <img src={adminDashboardIcon} alt={`${adminDashboardIcon}`} />
                                                    </button>                                                                                                       
                                                    <div className="flex-col items-start gap-4 w-72 min-h-48 py-6 px-6.4 shadow-lg rounded-lg relative top-20 -left-52 hidden lp">
                                                        <button to="#" onClick={logOut}>sign out</button>
                                                    </div>            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-bottom-pane">
                                        <table className="table-fixed capitalize">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>FULL NAME</th>
                                                    <th>E-MAIL</th>
                                                    <th>STATUS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.map((user) => {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if (roleUsers?.role === "ROLE_USERS") {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{user?._id}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className={`text-white font-medium text-xl rounded-full h-2 py-2 px-8 ${user?.isActivated ? "bg-green-500" : "bg-orange-500" }`}>{user?.isActivated  === true ? `approved` : `pending`}</td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </aside>


                                <aside className={`${activeDisplay === "admins" ? "block" : "hidden" }`}>
                                    <div className="right-top-pane h-114.8 grid sticky top-0 bg-white">
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
                                                                }
                                                            })
                                                        }
                                                    </h6>
                                                </div>
                                                <div className="flex flex-col gap-4 dropdown h-20 relative top-0 left-0 user-profile-img">
                                                    <button onClick={toggleProfileImgMenu} className="dropbtn absolute top-0">
                                                        <img src={adminDashboardIcon} alt={`${adminDashboardIcon}`} />
                                                    </button>                                                                                                       
                                                    <div className="hidden flex-col items-start gap-4 w-72 min-h-48 py-6 px-6.4 shadow-lg rounded-lg relative top-20 -left-52 lanky">
                                                        <button to="#" onClick={logOut}>sign out</button>
                                                    </div>            
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-bottom-pane">
                                        <table className="table-fixed capitalize">
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>FULL NAME</th>
                                                    <th>E-MAIL</th>
                                                    <th>STATUS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.map((user) => {
                                                        return (
                                                            user?.roles?.map((roleUsers, index) => {
                                                                if (roleUsers?.role === "ROLE_ADMIN" || roleUsers?.role === "ROLE_EDITOR" || roleUsers?.role === "ROLE_STAFF" ) {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{user?._id}</td>
                                                                            <td>{user?.firstName} {user?.lastName}</td>
                                                                            <td className="lowercase">{user?.email}</td>
                                                                            <td className={`text-white font-medium text-xl rounded-full h-2 py-2 px-8 ${user?.isActivated ? "bg-green-500" : "bg-orange-500" }`}>{user?.isActivated  === true ? `approved` : `pending`}</td>
                                                                        </tr>
                                                                    );
                                                                };
                                                            })
                                                        );
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </aside>
                                {/*******************************************************************/
                                /****************************   VIEWS   ****************************/
                                /*******************************************************************/}
                            </div>
                        </div>
                    </main>
                )
            }
        </>
    );
};


export default AdminDashboard;
