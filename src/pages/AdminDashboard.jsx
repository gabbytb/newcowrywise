import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { adminDashboardIcon, brandOfficialLogo } from "../assets/images";
import { HomeIcon, IconDecrease, IconIncrease, LogOutIcon, StaffsIcon, UsersIcon } from "../assets/icons";
import { dashboardMenuUsers } from "../constants";
// import { DashboardMenuCard } from "../components";







const AdminDashboard = ({ isLoggedIn }) => {
    

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
    // PAGE TITLE | CURRENTLY ACTIVE:- LOGGED-IN USER
    // ***********************************************
    const pageTitle = "Admin Dashboard", siteTitle = "Samuel Akinola Foundation";
    document.title = `${pageTitle} | ${siteTitle}`;

    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // *********************************************
    // *********************************************
    


    // *********************************************
    // DESTRUCTURE:-  (LOGGED-IN USER Props)
    // *********************************************
    const userName = isLoggedIn?.username ? isLoggedIn?.username : logOut();
    const userEmail = isLoggedIn?.email ? isLoggedIn?.email : logOut();
    const userRoles = isLoggedIn?.roles ? isLoggedIn?.roles : logOut();
    // const userAccessToken = isLoggedIn?.accessToken ? isLoggedIn?.accessToken : logOut();
    


    // *******************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // *******************************************************************
    const [isLoading, setIsLoading] = useState(true);
    const [activeDisplay, setActiveDisplay] = useState("home");
    // *******************************************************************
    // *******************************************************************



    // ************************************
    // MANAGE STATE:-  ALL USERS
    // ************************************
    const [users, setUsers] = useState([]);
    


    // ************************************
    // CALL TO API:-  FIND ALL USERS
    // ************************************
    useEffect(() => {      
        function findAllUsers() {
            const url = "http://127.0.0.1:8000/api/v1/admin/users/manage";
            axios.get(url)
            .then((response) => {
                if (activeDisplay === "users" || activeDisplay === "admins") {
                    const { success, data, message } = response.data;
                    if ((!success) || (message === "Users not found")) {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    }
                                
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
        
        var timerID = setTimeout(findAllUsers, 1800);   // Delay execution of findAllUsers by 1800ms
        return () => {
            clearTimeout(timerID);   // Clean up timer if component unmounts or token changes
        };
    }, [activeDisplay]);
    // *******************************************************************************************//
    // *******************************************************************************************//


   
    // const [dashboardUsersMenu, setDashboardUsersMenu] = useState(dashboardMenuUsers);
    // *******************************************************************************************//
    // USERS "DropDown" MENU:-  Controller
    // *******************************************************************************************//
    function toggleUsersDropdown() {       
        // if (usersDropDown[i]?.classList.contains("hidden")) {
        //     usersDropDown[i]?.classList.remove('hidden');
        //     usersDropDown[i]?.classList.add('flex');
        //     usersDropDown[i]?.classList.add("active-menu");
        // } else {
        //     usersDropDown[i]?.classList.remove('active-menu');
        //     usersDropDown[i]?.classList.remove('flex');
        //     usersDropDown[i]?.classList.add('hidden');
        // };
    };
    // *******************************************************************
    // *******************************************************************



    // *******************************************************************************************//
    // TOGGLE: USER "Profile Image" MENU
    // *******************************************************************************************//
    function toggleUserProfileMenu() {       
        var userDpMenu = document.querySelector('.upm');
        if (userDpMenu?.classList.contains("hidden")) {
            userDpMenu?.classList.remove('hidden');
            userDpMenu?.classList.add('flex');
        } else {
            userDpMenu?.classList.remove('flex');
            userDpMenu?.classList.add('hidden');
        };
    };
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
                                                    <button onClick={toggleUsersDropdown} className="dropbtn">
                                                        <UsersIcon /> <span>users</span>
                                                    </button>
                                                    <div className="hidden flex-col gap-4 px-15.9 usersDropdown">
                                                        <Link to="#" onClick={(e) => setActiveDisplay("users")}>user management</Link>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4 dropdown">
                                                    <button onClick={toggleUsersDropdown} className="dropbtn">
                                                        <StaffsIcon /> <span>staffs</span>
                                                    </button>
                                                    <div className="hidden flex-col gap-4 px-15.9 usersDropdown">
                                                        <Link to="#" onClick={(e) => setActiveDisplay("staffs")}>staff management</Link>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4 dropdown">
                                                    <button onClick={toggleUsersDropdown} className="dropbtn">
                                                        <StaffsIcon /> <span>admins</span>
                                                    </button>
                                                    <div className="hidden flex-col gap-4 px-15.9 usersDropdown">
                                                        <Link to="#" onClick={(e) => setActiveDisplay("admins")}>admins management</Link>
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









                                {/***************************************/
                                 /**************   VIEWS   **************/
                                 /***************************************/}      


                                {/******************************************************************************************/}
                                {/******************************    MAIN MENU:- Home VIEW    *******************************/}
                                {/******************************************************************************************/}                       
                                <aside className={`${activeDisplay === "home" ? "block" : "hidden" }`}>
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
                                                                }
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

                                    <div className="right-bottom-pane gap-12 relative h-full flex flex-col">
                                        {/* Section Body:  Row 1 [Date] */}
                                        <div className="flex flex-row">
                                            <div className="mx-0 px-12 h-full w-full">
                                                <div className="mb-6 text-14xl font-semibold">
                                                    <h1>Total Revenue</h1>
                                                </div>
                                                <div className="flex flex-row justify-start items-start m-0 gap-10">
                                                    <div className="xs:basis-1/3 xs:h-40 lg:h-52 bg-skin-simple-green shadow hover:shadow-md focus:shadow-md ease-linear duration-300 rounded-lg">
                                                        <div className="flex flex-row h-full sales-stats--wrap">
                                                            <div className="flex flex-col pl-10 sales_stats w-4/5">
                                                                <p>Daily Revenue</p>
                                                                <div className="flex flex-col gap-6">
                                                                    <strong>₦ 13,872,924.63</strong>
                                                                    <strong>
                                                                        24% <span>of 100%</span>
                                                                    </strong>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col sales_direction w-1/5">
                                                                <IconIncrease/>
                                                                <IconDecrease/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="xs:basis-1/3 xs:h-40 lg:h-52 bg-skin-simple-blue shadow hover:shadow-md focus:shadow-md ease-linear duration-300 rounded-lg">
                                                        <div className="flex flex-row h-full sales-stats--wrap">
                                                            <div className="flex flex-col pl-10 sales_stats w-4/5">
                                                                <p>Weekly Revenue</p>
                                                                <div className="flex flex-col gap-6">
                                                                    <strong>₦ 23,572,587.48</strong>
                                                                    <strong>
                                                                        48% <span>of 100%</span>
                                                                    </strong>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col sales_direction w-1/5">
                                                                <IconIncrease/>
                                                                <IconDecrease/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="xs:basis-1/3 xs:h-40 lg:h-52 bg-skin-simple-purple shadow hover:shadow-md focus:shadow-md ease-linear duration-300 rounded-lg">
                                                        <div className="flex flex-row h-full sales-stats--wrap">
                                                            <div className="flex flex-col pl-10 sales_stats w-4/5">
                                                                <p>Monthly Revenue</p>
                                                                <div className="flex flex-col gap-6">
                                                                    <strong>₦ 59,892,366.96</strong>
                                                                    <strong>
                                                                        48% <span>of 100%</span>
                                                                    </strong>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col sales_direction w-1/5">
                                                                <IconIncrease/>
                                                                <IconDecrease/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <HotelBookings /> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Section Body:  Row 1 [END] */}


                                        {/* Section Body:  Row 2 [Bar Chart] */}
                                        <div className="row m-0 justify-content-center">
                                            <div className="col-11 mx-0 shadow-lg px-0 bg-white">
                                                {/* <DailyVisitorsAnalytics /> */}
                                            </div>
                                        </div>
                                        {/* Section Body:  Row 2 [END] */}


                                        {/* Section Body:  Row 3 [Engagements] */}
                                        <div className="row m-0 justify-content-center">
                                            <div className="col-11 m-0 p-0 shadow-lg bg-white rounded">
                                                <div className="container-fluid p-0">
                                                    <div className="row m-0 justify-content-between">
                                                        {/* <DailyVisitorsData /> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Section Body:  Row 3 [END] */}


                                        {/* Section Body:  Row 4 [Map / Countries] */}
                                        <div className="row m-0 justify-content-center">
                                            <div className="col-11 d-flex mx-0 px-0">
                                                <div className="d-flex flex-xl-row flex-md-column row-gap-4 w-100 justify-content-between m-0 flex-sm-column">

                                                    {/* Column 1: [Map] */}
                                                    <div className="col-xl-6 px-0 shadow-lg mt-0">
                                                        <div className="d-flex flex-column bg-white px-0">
                                                            
                                                            {/* MAP ITSELF */}
                                                            <div className="col">
                                                                {/* Map Title */}
                                                                <div className="d-flex px-4 pt-4 pb-4 justify-content-between">
                                                                    <h6 className="fw-bold mb-0">Top Countries</h6>
                                                                </div>

                                                                {/* Map Integration */}
                                                                <div className="d-flex maps flex-column">
                                                                    {/* <MapComponent /> */}
                                                                </div>
                                                            </div>
                                                            {/* MAP ITSELF */}
                                                        {/* ***************************************************************** */}                                
                                                            {/* MAP - COUNTRIES */}
                                                            <div className="col px-4 py-4">
                                                                <div className="row m-0 mb-2 justify-content-between">
                                                                    <div className="col-xl-4 col-md-4 d-flex px-0 align-items-center">
                                                                        <p className="mb-0">
                                                                            {/* <img src={USAFlag} alt="usa flag" /> United States */}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-xl-7 col-md-8 d-flex align-items-center px-0">
                                                                        {/* <ProgressBar variant="success" now={55} label={35 + '%'} /> */}
                                                                    </div>
                                                                </div>
                                                                <div className="row m-0 mb-2 justify-content-between">
                                                                    <div className="col-xl-4 col-md-4 d-flex px-0 align-items-center">
                                                                        <p className="mb-0">
                                                                            {/* <img src={CanadaFlag} alt="canada flag" /> Canada */}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-xl-7 col-md-8 d-flex align-items-center px-0">
                                                                        {/* <ProgressBar variant="success" now={48} label={26 + '%'} /> */}
                                                                    </div>
                                                                </div>
                                                                <div className="row m-0 mb-2 justify-content-between">
                                                                    <div className="col-xl-4 col-md-4 d-flex px-0 align-items-center">
                                                                        <p className="mb-0">
                                                                            {/* <img src={FranceFlag} alt="France flag" /> France */}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-xl-7 col-md-8 d-flex align-items-center px-0">
                                                                        {/* <ProgressBar variant="success" now={38} label={18 + '%'} /> */}
                                                                    </div>
                                                                </div>
                                                                <div className="row m-0 mb-2 justify-content-between">
                                                                    <div className="col-xl-4 col-md-4 d-flex px-0 align-items-center">
                                                                        <p className="mb-0">
                                                                            {/* <img src={ItalyFlag} alt="Italy flag" /> Italy */}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-xl-7 col-md-8 d-flex align-items-center px-0">
                                                                        {/* <ProgressBar variant="success" now={30} label={14 + '%'} /> */}
                                                                    </div>
                                                                </div>
                                                                <div className="row m-0 mb-2 justify-content-between">
                                                                    <div className="col-xl-4 col-md-4 d-flex px-0 align-items-center">
                                                                        <p className="mb-0">
                                                                            {/* <img src={AustraliaFlag} alt="Australia flag" /> Australia */}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-xl-7 col-md-8 d-flex align-items-center px-0">
                                                                        {/* <ProgressBar variant="success" now={25} label={10 + '%'} /> */}
                                                                    </div>
                                                                </div>
                                                                <div className="row m-0 mb-2 justify-content-between">
                                                                    <div className="col-xl-4 col-md-4 d-flex px-0 align-items-center">
                                                                        <p className="mb-0">
                                                                            {/* <img src={IndiaFlag} alt="India flag" /> India */}
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-xl-7 col-md-8 d-flex align-items-center px-0">
                                                                        {/* <ProgressBar variant="success" now={20} label={7 + '%'} /> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* MAP - COUNTRIES */}

                                                        </div>
                                                    </div>
                                                    {/* End:  Column 1: [Map] */}

                                                {/* ***************************************************************** */}                                

                                                    {/* Column 2: [Top Content & Top Channels] */}
                                                    <div className="col-xl-6 px-md-0 ps-xl-4 pe-xl-0 ps-lg-0 pe-lg-0 m-lg-0 m-md-0">
                                                        <div className="row m-0 g-4 h-100">    
                                                        
                                                            {/* Column 1: [Top Content] */}
                                                            <div className="col-xl-12 p-0 d-flex flex-column px-4 py-4 shadow-lg bg-white mt-0">
                                                                <div className="row justify-content-between m-0 mb-3">
                                                                    <div className="col-5 d-flex p-0 justify-content-start">
                                                                        <h6 className="fw-bold mb-0">Top Content</h6>
                                                                    </div>
                                                                    <div className="col-2 d-flex p-0 justify-content-end">
                                                                        {/* <img className="w-25" src={moreIcon} alt="click for more" /> */}
                                                                    </div>
                                                                </div>

                                                                <div className="row m-0">
                                                                    <div className="col-xl-10 col-md-10 px-0 d-flex">
                                                                        <div className="row m-0 w-100">     
                                                                            <div className="d-flex flex-column px-0">
                                                                                <div className="d-flex justify-content-between mb-3">
                                                                                    <p className="text-secondary m-0">URL</p>
                                                                                    <p className="text-secondary m-0">Views</p>
                                                                                </div>      


                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded mb-2">
                                                                                    / 
                                                                                    <p className="mb-0">4.2K</p>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded mb-2">
                                                                                    /blog 
                                                                                    <p className="mb-0">1.9K</p>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded mb-2">
                                                                                    /reserve/success 
                                                                                    <p className="mb-0">1.5K</p>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded mb-2">
                                                                                    /product/product-details 
                                                                                    <p className="mb-0">974</p>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded">
                                                                                    /blog/digital-marketing 
                                                                                    <p className="mb-0">179</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-xl-2 col-md-2 d-flex flex-column px-0">
                                                                        <div className="text-end d-flex flex-column justify-content-between">

                                                                            <div className="row m-0 mb-3">
                                                                                <p className="m-0 px-0 d-flex justify-content-end text-secondary">Uniques</p>
                                                                            </div>   
                                                                                                        
                                                                            <div className="row m-0">
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">2.1K</p></div>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">139</p></div>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">290</p></div>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">176</p></div>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">57</p></div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* End:  Column 1: [Top Content] */}

                                                        {/* ***************************************************************** */}
                                                        
                                                            {/* Column 2: [Top Channels] */}
                                                            <div className="col-xl-12 p-0 d-flex flex-column px-4 py-4 shadow-lg bg-white">

                                                                <div className="row justify-content-between m-0 mb-3">
                                                                    <div className="col-6 d-flex p-0 justify-content-start">
                                                                        <h6 className="fw-bold mb-0">Top Channels</h6>
                                                                    </div>
                                                                    
                                                                    <div className="col-2 d-flex p-0 justify-content-end">
                                                                        {/* <img className="w-25" src={moreIcon} alt="click for more" /> */}
                                                                    </div>
                                                                </div>

                                                                <div className="row m-0">

                                                                    <div className="col-xl-10 col-md-10 px-0 d-flex">
                                                                        <div className="row m-0 w-100">     
                                                                            <div className="d-flex flex-column px-0">
                                                                                
                                                                                <div className="d-flex justify-content-between mb-3">
                                                                                    <p className="text-secondary m-0">URL</p>
                                                                                    <p className="text-secondary m-0">Views</p>
                                                                                </div>     


                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded mb-2">Google <p className="mb-0">4.2K</p></div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded mb-2">Github <p className="mb-0">1.9K</p></div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded mb-2">Producthunt <p className="mb-0">1.5K</p></div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded mb-2">Facebook <p className="mb-0">974</p></div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-primary py-2 ps-3 pe-2 rounded">Twitter <p className="mb-0">179</p></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-xl-2 col-md-2 d-flex flex-column px-0">
                                                                        <div className="text-end d-flex flex-column justify-content-between">

                                                                            <div className="row m-0 mb-3">
                                                                                <p className="m-0 px-0 d-flex justify-content-end text-secondary">Uniques</p>
                                                                            </div>                            

                                                                            <div className="row m-0">
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">3.9K</p></div>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">509</p></div>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">986</p></div>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">639</p></div>
                                                                                </div>
                                                                                <div className="d-flex flex-row w-100 justify-content-between progress-bar bg-light py-0 px-0 rounded mb-2">
                                                                                    <div className="d-flex flex-row w-100 justify-content-end py-2 ps-3 pe-1 mb-0"><p className="mb-0">57</p></div>
                                                                                </div>   
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                            {/* End:  Column 2: [Top Channels] */}

                                                        </div>
                                                    </div>
                                                    {/* End:  Column 2: [Top Content & Top Channels] */}

                                                </div>
                                            </div>
                                        </div>
                                        {/* Section Body:  Row 4 [END] */}
                                            

                                        {/* Section Body:  Row 5 [Pie Chart] */}
                                        <div className="row m-0 justify-content-center mb-lg-5">
                                            <div className="col-11 d-flex mx-0 px-0">
                                                <div className="row w-100 justify-content-between m-0 row-gap-md-4">

                                                    {/* Column 1: [Pie Chart] */}
                                                    {/* col-xl-5 px-lg-0 px-md-0 py-md-0 mt-0 mx-0 shadow-lg d-flex pb-4 mb-lg-4 mb-md-4 */}
                                                    <div className="col-xl-5 shadow-lg d-flex p-0 m-0">
                                                        <div className="d-flex flex-column px-0 w-100">
                                                            
                                                            {/* PIE CHART ITSELF */}
                                                            <div className="col d-flex flex-column bg-white justify-content-start row-gap-5">

                                                                {/* Pie Chart Title */}
                                                                <div className="d-flex px-4 pt-4 justify-content-between">
                                                                    <h6 className="fw-bold mb-0">Visitors Analytics</h6>
                                                                </div>
                                                                {/* END:  Pie Chart Title */}

                                                            {/* ***************************************************************** */}

                                                                {/* Pie Chart Integration */}
                                                                <div className="px-4 py-5 d-flex justify-content-center">
                                                                    {/* <PieChartComponent /> */}
                                                                </div>
                                                                {/* END:  Pie Chart Integration */}

                                                            </div>
                                                            {/* PIE CHART ITSELF */}

                                                        </div>
                                                    </div>
                                                    {/* End:  Column 1: [Pie Chart] */}

                                                {/* ***************************************************************** */}

                                                    {/* Column 2: [Top Channels] */}
                                                    <div className="col-xl-7 ps-xl-4 pe-xl-0 px-md-0 m-0">
                                                        <div className="row m-0 g-4 h-100">    

                                                            <div className="col-xl-12 p-0 d-flex flex-column px-0 pt-4 pb-5 shadow-lg bg-white mt-0">

                                                                {/* Top Channels [TITLE] */}
                                                                <div className="row justify-content-between m-0 mb-4 px-4">
                                                                    <div className="col d-flex p-0 justify-content-start">
                                                                        <h6 className="fw-bold mb-0">Top Channels</h6>
                                                                    </div>
                                                                </div>
                                                                {/* END: Top Channels [TITLE] */}

                                                            {/* ***************************************************************** */}

                                                                {/* Top Channels [PRODUCTS HEADER] */}
                                                                <div className="row m-0 border-top border-bottom px-4">
                                                                    <div className="col-xl-10 col-md-10 px-0 d-flex w-100 py-3">
                                                                        <div className="row m-0 w-100 justify-content-between">     
                                                                            <div className="col-lg-6 col-md-4 flex-md-column row-gap-md-2 px-0 m-0 d-flex justify-content-lg-start align-items-left">
                                                                                <p className="text-gray mb-0">Product Name</p>
                                                                            </div>
                                                                            <div className="col-lg-2 col-md-3 px-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-gray mb-0">Category</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-gray mb-0">Price</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 d-flex justify-content-lg-center align-items-center">
                                                                                <p className="text-gray mb-0">Sold</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-1 px-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-gray mb-0">Profit</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* END:  Top Channels [PRODUCTS HEADER] */}

                                                            {/* ***************************************************************** */}

                                                                {/* Top Channels [PRODUCTS LIST 1] */}
                                                                <div className="row m-0 border-bottom px-4">
                                                                    <div className="col-xl-10 col-md-10 px-0 d-flex w-100 py-4">
                                                                        <div className="row m-0 w-100 justify-content-between">     
                                                                            <div className="col-lg-6 col-md-4 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                {/* <img className="me-2" src={AppleWatch} alt="apple watch series 7" /> */}
                                                                                <p className="text-dark mb-0">Apple Watch Series 7</p>
                                                                            </div>
                                                                            <div className="col-lg-2 col-md-3 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-dark mb-0">Electronics</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-dark mb-0">$269</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 d-flex justify-content-lg-center align-items-center">
                                                                                <p className="text-dark mb-0">22</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-1 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-success mb-0">$45</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* END:  Top Channels [PRODUCT LIST 1] */}

                                                                {/* Top Channels [PRODUCTS LIST 2] */}
                                                                <div className="row m-0 border-bottom px-4">
                                                                    <div className="col-xl-10 col-md-10 px-0 d-flex w-100 py-4">
                                                                        <div className="row m-0 w-100 justify-content-between">     
                                                                            <div className="col-lg-6 col-md-4 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                {/* <img className="me-2" src={MacbookPro} alt="Macbook Pro M1" /> */}
                                                                                <p className="text-dark mb-0">Macbook Pro M1</p>
                                                                            </div>
                                                                            <div className="col-lg-2 col-md-3 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-dark mb-0">Electronics</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-dark mb-0">$546</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 d-flex justify-content-lg-center align-items-center">
                                                                                <p className="text-dark mb-0">34</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-1 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-success mb-0">$125</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* END:  Top Channels [PRODUCT LIST 2] */}

                                                                {/* Top Channels [PRODUCTS LIST 3] */}
                                                                <div className="row m-0 border-bottom px-4">
                                                                    <div className="col-xl-10 col-md-10 px-0 d-flex w-100 py-4">
                                                                        <div className="row m-0 w-100 justify-content-between">     
                                                                            <div className="col-lg-6 col-md-4 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                {/* <img className="me-2" src={DellInspiron} alt="dell inspiron 15" /> */}
                                                                                <p className="text-dark mb-0">Dell Inspiron 15</p>
                                                                            </div>
                                                                            <div className="col-lg-2 col-md-3 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-dark mb-0">Electronics</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-dark mb-0">$443</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 d-flex justify-content-lg-center align-items-center">
                                                                                <p className="text-dark mb-0">64</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-1 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-success mb-0">$247</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* END:  Top Channels [PRODUCT LIST 3] */}

                                                                {/* Top Channels [PRODUCTS LIST 4] */}
                                                                <div className="row m-0 px-4">
                                                                    <div className="col-xl-10 col-md-10 px-0 d-flex w-100 py-4">
                                                                        <div className="row m-0 w-100 justify-content-between">     
                                                                            <div className="col-lg-6 col-md-4 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                {/* <img className="me-2" src={HpProbook} alt="apple watch series 7" /> */}
                                                                                <p className="text-dark mb-0">HP Probook 450</p>
                                                                            </div>
                                                                            <div className="col-lg-2 col-md-3 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-dark mb-0">Electronics</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-dark mb-0">$499</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-2 px-0 d-flex justify-content-lg-center align-items-center">
                                                                                <p className="text-dark mb-0">72</p>
                                                                            </div>
                                                                            <div className="col-lg-1 col-md-1 px-0 m-0 d-flex justify-content-lg-start align-items-center">
                                                                                <p className="text-success mb-0">$103</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* END:  Top Channels [PRODUCT LIST 4] */}
                                                            </div>

                                                        </div>
                                                    </div>
                                                    {/* END:  Column 2: [Top Channels] */}

                                                </div>
                                            </div>
                                        </div> 
                                        {/* Section Body:  Row 5 [END] */}

                                    </div>
                                </aside>                           
                                 {/******************************************************************************************/}
                                {/******************************************************************************************/}

                                
                                {/******************************************************************************************/}
                                {/*******************************    SETTINGS:- Users VIEW    ******************************/}
                                {/******************************************************************************************/}
                                <aside className={`${activeDisplay === "users" ? "block" : "hidden" }`}>
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
                                                                }
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
                                {/******************************************************************************************/}
                                {/******************************************************************************************/}


                                {/******************************************************************************************/}
                                {/*******************************    SETTINGS:- Staffs VIEW    *****************************/}
                                {/******************************************************************************************/}
                                <aside className={`${activeDisplay === "admins" ? "block" : "hidden" }`}>
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
                                                                }
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
                                {/******************************************************************************************/}
                                {/******************************************************************************************/}


                                {/***************************************/
                                 /**************   VIEWS   **************/
                                 /***************************************/}
                            </div>
                        </div>
                    </main>
                )
            }
        </>
    );
};


export default AdminDashboard;
