import { useEffect } from "react";
import ReactGA from 'react-ga';
import { useRoutes } from "react-router-dom";
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


// PRODUCTION Data for Travelbeta Blog
// const TRACKING_ID = "UA-277984631-1";   // OLD_TRACKING_ID
// const TRACKING_ID = "397205433";        // NEW_TRACKING_ID


// DEVELOPMENT Data
const TRACKING_ID = "AW-402104991";
ReactGA.initialize(TRACKING_ID);


// The clearTimeout() method is a powerful JavaScript tool 
// that allows developers to clear and reset the timer 
// created by the setTimeout() method. 
// It is an invaluable asset to have in any software development project, 
// especially when you need to reset the timer 
// or delay a certain action within the code.
export default function App() {


    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
        // let pageViews = 
        // console.log("TRACKING PAGE VIEWS: ", pageViews);
    }, []);
    

    const routesConfig = [       
        { path: "/", element: <OurProgress /> },
        { path: "/home", element: <Home /> },
        { path: "/donations", element: <DonationPage /> },
        { path: "/user/verify", element: <VerifySignUp /> },
        // { path: "/user/verify/:token", element: <VerifySignUp />, },
        { path: "/user/signup", element: <SignUp />, },
        { path: "/user/login", element: <SignIn />, },
        { path: "/admin/dashboard", element: <AdminDashboard />, },
        { path: "/admin/users/manage", element: <DashboardUsersPage />, },
        { path: "/admin/users/manage/:id", element: <DashboardUsersDetailsPage />, },
        { path: "/admin/staffs/manage", element: <DashboardStaffsPage />, },
        { path: "/admin/staffs/manage/:id", element: <DashboardStaffsDetailsPage />, },
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