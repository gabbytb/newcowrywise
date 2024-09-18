// components
import { googleLogout } from "@react-oauth/google";
import CardStats from "../Cards/CardStats";






export default function HeaderStats ({ isLoggedIn }) {
    

    // ***************************************************************************
    // CURRENT ACTIVE USER:-
    // ***************************************************************************
    isLoggedIn = JSON.parse(localStorage.getItem("user"));
    // ***************************************************************************
    // FUNCTION TO LOG-OUT CURRENT ACTIVE USER
    // ***************************************************************************
    function logOut() {
        // Clear User Details from Local Storage
        localStorage.clear();
        // log out function to log the user out of google and set the profile array to null
        googleLogout();
        // redirect to Login Page
        const redirToLOGIN = "/user/login";
        window.location.replace(redirToLOGIN);
    };
    // ***************************************************************************
    // DESTRUCTURE CURRENT ACTIVE USER PROPS:-
    // ***************************************************************************
    const lastName = isLoggedIn?.lastName ? isLoggedIn?.lastName : logOut();
    // ***************************************************************************
    // ***************************************************************************



    return (
        <>            
            {/* Header */}
            <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-6">
              

                {/* Welcome Logged-In User */}
                <div className="px-4 md:px-10 pb-6 mx-auto w-full">  
                    <p className="w-full lg:w-6/12 xl:w-3/12 px-4 text-3xl text-white">     
                        Welcome <span className="font-bold text-white">{lastName}</span>
                    </p>
                </div>


                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                    
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                              <CardStats
                                statSubtitle="TRAFFIC"
                                statTitle="350,897"
                                statArrow="up"
                                statPercent="3.48"
                                statPercentColor="text-emerald-500"
                                statDescripiron="Since last month"
                                statIconName="far fa-chart-bar"
                                statIconColor="bg-red-500"
                              />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                              <CardStats
                                statSubtitle="NEW USERS"
                                statTitle="2,356"
                                statArrow="down"
                                statPercent="3.48"
                                statPercentColor="text-red-500"
                                statDescripiron="Since last week"
                                statIconName="fas fa-chart-pie"
                                statIconColor="bg-orange-500"
                              />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                              <CardStats
                                statSubtitle="SALES"
                                statTitle="924"
                                statArrow="down"
                                statPercent="1.10"
                                statPercentColor="text-orange-500"
                                statDescripiron="Since yesterday"
                                statIconName="fas fa-users"
                                statIconColor="bg-pink-500"
                              />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                              <CardStats
                                statSubtitle="PERFORMANCE"
                                statTitle="49,65%"
                                statArrow="up"
                                statPercent="12"
                                statPercentColor="text-emerald-500"
                                statDescripiron="Since last month"
                                statIconName="fas fa-percent"
                                statIconColor="bg-lightBlue-500"
                              />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
