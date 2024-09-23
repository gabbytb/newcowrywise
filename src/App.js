// import { useEffect } from "react";
// import ReactGA from 'react-ga';
import { Routes, Route, } from "react-router-dom";
import {
  Home,
  OurProgress, 
  // DonationPage,
  SignUp,
  // VerifySignUp,
  SignIn,
  // AdminDashboard, 
  // DashboardUsersPage, 
  // DashboardUsersDetailsPage,
  // DashboardStaffsPage, DashboardStaffsDetailsPage,
  // AccountUsers,
} from "./pages";
import { 
  MainDashboard,
  DashboardUsers, 
  DashboardStaffs,
} from "./layouts";




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
    

    return (
      <Routes>
        {/* add routes with layouts */}
        <Route path="/admin/dashboard" element={<MainDashboard />} />
        <Route path="/admin/users" element={<DashboardUsers />} />
        <Route path="/admin/staffs" element={<DashboardStaffs />} />
        {/* <Route path="/admin/users" element={<DashboardUsersPage />} /> */}
        
        {/* <Route path="/auth" component={Auth} /> */}


        {/* add routes without layouts */}
        {/* <Route path="/landing" exact component={Landing} /> */}
        {/* <Route path="/profile" exact component={Profile} /> */}
        <Route path="/user/signup" exact element={<SignUp />} />
        <Route path="/user/login" exact element={<SignIn />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/" exact element={<OurProgress />} />
        

        {/* add redirect for first page */}
        {/* <Redirect from="*" to="/" /> */}
        {/* <Route path="/admin/dashboard?logout" element={<Navigate replace to="/" />} /> */}
      </Routes>
    );
};










    // const routesConfig = [          
    //     //  TEST ROUTES
    //     { path: "/dash", element: <Admin /> },


    //     //  MAIN ROUTES
    //     { path: "/", element: <OurProgress /> },
    //     { path: "/home", element: <Home /> },
    //     { path: "/donations", element: <DonationPage /> },
    //     { path: "/user/verify", element: <VerifySignUp /> },
    //     // { path: "/user/verify/:token", element: <VerifySignUp />, },
    //     { path: "/user/signup", element: <SignUp />, },
    //     { path: "/user/login", element: <SignIn />, },
    //     { path: "/admin/dashboard", element: <AdminDashboard />, },
    //     { path: "/admin/users/", element: <DashboardUsersPage />, },
    //     { path: "/admin/users/:id", element: <DashboardUsersDetailsPage />, },
    //     { path: "/admin/staffs", element: <DashboardStaffsPage />, },
    //     { path: "/admin/staffs/:id", element: <DashboardStaffsDetailsPage />, },
    //     { path: "/admin/users/management", element: <AccountUsers />, },
    // ];
    // const routes = useRoutes(routesConfig);
    // return routes;







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