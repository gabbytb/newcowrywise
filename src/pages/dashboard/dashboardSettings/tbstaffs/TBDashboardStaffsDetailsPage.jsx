import { useEffect, useState, } from "react";
import { useParams, Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import api from "../../../../api";
import { adminDashboardIcon, brandOfficialLogo } from "../../../../assets/images";
import { HomeIcon, LogOutIcon, StaffsIcon, UsersIcon } from "../../../../assets/icons";









const TBDashboardStaffsDetailsPage = ({ isLoggedIn }) => {
    
    // import { useNavigate } from "react-router-dom";
    // let navigate = useNavigate();
    // <button onClick={() => navigate(-1)}>Back</button> 

    
    // *******************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // *******************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("staffsDetails");
    // *******************************************************************
    // *******************************************************************
    

    // *********************************************
    // FUNCTION TO LOG-OUT LOGGED-IN USER
    // *********************************************
    function logOut() {
        // Clear User Details from Local Storage
        localStorage.clear();
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        const redirToLOGIN = "/user/login";
        window.location.replace(redirToLOGIN);
    };
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
        };
    }, [isLoggedIn]);
    // *********************************************
    // *********************************************


    // *********************************************
    // DESTRUCTURE CURRENTLY ACTIVE USER:-
    // *********************************************
    const lastName = isLoggedIn?.lastName ? isLoggedIn?.lastName : logOut();
    const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();

    
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





    // ************************************
    // MANAGE STATE:-  TO FIND USER BY ID
    // ************************************
    const { id } = useParams();   
    const [ user, setUser ] = useState(null);
    console.log("Retrieved USER: ", user?.roles);

    const leftArrow = '<';

    // **************************************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND USER BY ID
    // **************************************************************************************************
    useEffect(() => {     
        function findUserByID() {
            const url = `/api/v1/admin/users/manage/${id}`;
            api.get(url)
            .then((response) => {
                const { success, data, message } = response.data;
                if ((!success) || (message === "User not found")) {
                    console.log("Message: ", message);
                    console.log("Success: ", success);
                };
                            
                // Perform Actions Here if Truthy
                setUser(data);
                console.log("Message: ", message);
                console.log("Success: ", success);
            })
            .catch((error) => {
                // Handle error state or logging here
                console.log("Error encountered: ", error);
            })
            .finally(() => {
                setIsLoading(false);    // Always disable loading state, whether successful or not
            });
        };

        var timerID = setTimeout(findUserByID, 300);   // Delay execution of findAllUsers by 1800ms
        return () => {
            // Clean up timer if component unmounts or token changes
            clearTimeout(timerID);
        };
    }, [id]);
    // *******************************************************************************************//
    // *******************************************************************************************//

    
    // if (user?.roles[n]?.role === "ROLE_ADMIN") {
    //     role = "Admin";
    //     return role;
    // } else if (user?.roles[n]?.role === "ROLE_EDITOR") {
    //     role = "Editor";
    //     return role;
    // } else if (user?.roles[n]?.role === "ROLE_STAFF") {
    //     role = "Staff";
    //     return role;
    // } else if (user?.roles[n]?.role === "ROLE_USERS") {
    //     role = "User";
    //     return role;
    // } else {
    //     role = "Unassigned";
    //     return role;
    // };


    // function goBack() {
    //     window.history.back();
    // };
    // onClick={goBack}



    if (isLoading) {
        return (
            <>
                <main id="dashboardStaffsDetailsID" className="admin-dashboard">
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
                            <aside className={`${activeDisplay === "staffsDetails" ? "block" : "hidden" }`}>
                                <div className="right-top-pane h-114.8 grid sticky top-0 bg-white z-50">
                                    <div className="flex justify-between items-center h-full flex-row px-10">
                                        <div className="rt-left-pane">
                                            <h1>Welcome 
                                                <strong className="capitalize text-black"> {lastName}</strong>
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
                                    {user?._id}
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
            <main id="dashboardStaffsDetailsID" className="admin-dashboard">
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
                        <aside className={`${activeDisplay === "staffsDetails" ? "block" : "hidden" }`}>
                            <div className="right-top-pane h-114.8 grid sticky top-0 bg-white z-50">
                                <div className="flex justify-between items-center h-full flex-row px-10">
                                    <div className="rt-left-pane">
                                        <h1>Welcome 
                                            <strong className="capitalize text-black"> {lastName}</strong>
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

                            <div className="right-bottom-pane relative h-full flex flex-col bg-skin-mild-gray">                               
                                <div className="flex flex-col gap-10 justify-between mx-9 mb-8">                                    
                                    <div class="bg-gray-100">
                                        <div class="container mx-auto py-8">

                                            {/* GO BACK ONE STEP */}
                                            <div className="flex px-4 mt-6 mb-12">  
                                                <button>
                                                    <Link className="font-bold text-3xl/normal" to={"/admin/staffs"}>{leftArrow} Back</Link>
                                                </button>                                            
                                            </div>
                                            {/* GO BACK ONE STEP */}


                                            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                                                <div className="col-span-4 sm:col-span-4">
                                                    <div class="bg-white shadow rounded-lg p-6">
                                                        <div class="flex flex-col items-center">
                                                            <img src="https://randomuser.me/api/portraits/men/94.jpg" class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"/>
                                                            <h1 class="text-2xl/normal font-bold capitalize">{user?.firstName}  {user?.lastName}</h1>
                                                            {
                                                                user?.roles?.map((role) => {
                                                                    if (role === "ROLE_ADMIN") {
                                                                        <p class="text-gray-700">{role}</p>
                                                                    }
                                                                })
                                                            }
                                                            <div class="mt-6 flex flex-wrap gap-4 justify-center">
                                                                <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
                                                                <a href="#" class="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                                                            </div>
                                                        </div>
                                                        
                                                        <hr class="my-6 border-t border-gray-300"></hr>
                                                        
                                                        <div class="flex flex-col">
                                                            <span class="text-gray-700 text-3xl capitalize font-bold tracking-wider mt-2 mb-6">Skills</span>
                                                            <ul className="text-2xl/relaxed font-medium">
                                                                <li class="mb-2">JavaScript</li>
                                                                <li class="mb-2">React</li>
                                                                <li class="mb-2">Node.js</li>
                                                                <li class="mb-2">HTML/CSS</li>
                                                                <li class="mb-2">Tailwind Css</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="col-span-4 sm:col-span-8">
                                                    <div class="bg-white shadow rounded-lg p-6 flex flex-col gap-6">
                                                        <div className="flex flex-col">
                                                            <h2 class=" text-3xl capitalize font-bold tracking-wider mb-4">About Me</h2>
                                                            <p class="text-gray-700 text-2xl/relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
                                                                vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                                                suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
                                                                et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                                                                luctus risus rhoncus id.
                                                            </p>
                                                            <h3 class="font-semibold text-center mt-3 -mb-2">
                                                                Find me on
                                                            </h3>
                                                            <div class="flex justify-center items-center gap-6 my-6">
                                                                <a class="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds LinkedIn" href=""
                                                                    target="_blank">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-6">
                                                                        <path fill="currentColor"
                                                                            d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z">
                                                                        </path>
                                                                    </svg>
                                                                </a>
                                                                <a class="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href=""
                                                                    target="_blank">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="h-6">
                                                                        <path fill="currentColor"
                                                                            d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z">
                                                                        </path>
                                                                    </svg>
                                                                </a>
                                                                <a class="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Facebook" href=""
                                                                    target="_blank">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="h-6">
                                                                        <path fill="currentColor"
                                                                            d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z">
                                                                        </path>
                                                                    </svg>
                                                                </a>
                                                                <a class="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Instagram" href=""
                                                                    target="_blank">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-6">
                                                                        <path fill="currentColor"
                                                                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                                                                        </path>
                                                                    </svg>
                                                                </a>
                                                                <a class="text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds Twitter" href=""
                                                                    target="_blank">
                                                                    <svg class="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                                        <path fill="currentColor"
                                                                            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z">
                                                                        </path>
                                                                    </svg>
                                                                </a>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col">
                                                            <h2 class="text-3xl capitalize font-bold tracking-wider mt-4 mb-4">Experience</h2>
                                                            <div class="mb-6">
                                                                <div class="flex justify-between flex-wrap gap-2 w-full">
                                                                    <span class="text-gray-700 font-bold">Web Developer</span>
                                                                    <p>
                                                                        <span class="text-gray-700 mr-2">at ABC Company</span>
                                                                        <span class="text-gray-700">2017 - 2019</span>
                                                                    </p>
                                                                </div>
                                                                <p class="mt-2 text-2xl/relaxed">
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                                                                    tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                                                    suscipit.
                                                                </p>
                                                            </div>
                                                            <div class="mb-6">
                                                                <div class="flex justify-between flex-wrap gap-2 w-full">
                                                                    <span class="text-gray-700 font-bold">Web Developer</span>
                                                                    <p>
                                                                        <span class="text-gray-700 mr-2">at ABC Company</span>
                                                                        <span class="text-gray-700">2017 - 2019</span>
                                                                    </p>
                                                                </div>
                                                                <p class="mt-2 text-2xl/relaxed">
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                                                                    tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                                                    suscipit.
                                                                </p>
                                                            </div>
                                                            <div class="mb-6">
                                                                <div class="flex justify-between flex-wrap gap-2 w-full">
                                                                    <span class="text-gray-700 font-bold">Web Developer</span>
                                                                    <p>
                                                                        <span class="text-gray-700 mr-2">at ABC Company</span>
                                                                        <span class="text-gray-700">2017 - 2019</span>
                                                                    </p>
                                                                </div>
                                                                <p class="mt-2 text-2xl/relaxed">
                                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                                                                    tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                                                                    suscipit.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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


export default TBDashboardStaffsDetailsPage;