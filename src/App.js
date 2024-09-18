// import { useEffect } from "react";
// import ReactGA from 'react-ga';
import { useRoutes, } from "react-router-dom";
import {
  Home,
  OurProgress, DonationPage,
  SignUp,
  VerifySignUp,
  SignIn,
  AdminDashboard, 
  DashboardUsersPage, DashboardUsersDetailsPage,
  DashboardStaffsPage, DashboardStaffsDetailsPage,
  AccountUsers,
} from "./pages";
import { 
  Admin 
} from "./layouts";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";


// DEVELOPMENT Data [GOOGLE ANALYTICS]
// const reactGA = "G-0LBZW5F0BD";

// DEVELOPMENT Data [GOOGLE TAG]
// const reactGA = "GT-WB2R977Q"

// DEVELOPMENT Data [GOOGLE TAG MANAGER]
// const reactGA = "GTM-MM2Z27G9";




// Initialize Google Analytics
// ReactGA.initialize(`${reactGA}`);




// The clearTimeout() method is a powerful JavaScript tool 
// that allows developers to clear and reset the timer 
// created by the setTimeout() method. 
// It is an invaluable asset to have in any software development project, 
// especially when you need to reset the timer 
// or delay a certain action within the code.
export default function App() {

    
    // useEffect(() => {      
    //     // Optionally, you can use ReactGA.pageview to track page views
    //     // ReactGA.set({ page: window.location.pathname });
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // }, []);
    

    const routesConfig = [          
        //  TEST ROUTES
        { path: "/dash", element: <Admin /> },


        //  MAIN ROUTES
        { path: "/", element: <OurProgress /> },
        { path: "/home", element: <Home /> },
        { path: "/donations", element: <DonationPage /> },
        { path: "/user/verify", element: <VerifySignUp /> },
        // { path: "/user/verify/:token", element: <VerifySignUp />, },
        { path: "/user/signup", element: <SignUp />, },
        { path: "/user/login", element: <SignIn />, },
        { path: "/admin/dashboard", element: <AdminDashboard />, },
        { path: "/admin/users/", element: <DashboardUsersPage />, },
        { path: "/admin/users/:id", element: <DashboardUsersDetailsPage />, },
        { path: "/admin/staffs", element: <DashboardStaffsPage />, },
        { path: "/admin/staffs/:id", element: <DashboardStaffsDetailsPage />, },
        { path: "/admin/users/management", element: <AccountUsers />, },
    ];
    const routes = useRoutes(routesConfig);
    return routes;
};
















































//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route 
//          path: "/admin/staffs/", 
//          element: <DashboardStaffsPage />,    
//          children: [
//              {
//                   path: ":id",
//                    element: <DashboardStaffsDetailsPage />,
//              },
//          ]
//       />
//     </Routes>
//   );