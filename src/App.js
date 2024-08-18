import { useEffect } from "react";
import ReactGA from 'react-ga';
// import { Routes, Route } from 'react-router-dom';
import { useRoutes } from "react-router-dom";
// ...
import { 
  Home,
  OurProgress, DonationPage,
  SignUp,
//   SignUpVerification, 
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
// const App = () => {
  
//   useEffect(() => {
//     ReactGA.pageview(window.location.pathname + window.location.search);
//     // let pageViews = 
//     // console.log("TRACKING PAGE VIEWS: ", pageViews);
//   }, []);

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/our-progress" element={<OurProgress />}></Route>
//       <Route path="/donations" element={<DonationPage />}></Route>
//       <Route path="/user/verify/:token" element={<SignUpVerification />}></Route>
//       {/* <Route path="/user/verify" element={<VerifySignUp />}></Route> */}
      
//       <Route path="/user/signup" element={<SignUp />}></Route>
//       <Route path="/user/login" element={<SignIn />}></Route>

//       <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
//       <Route path="/admin/users" element={<DashboardUsersPage />}></Route>
//       <Route path="/admin/staffs" element={<DashboardStaffsPage />}></Route>
//       <Route path="/admin/users/:id" element={<DashboardUsersDetailsPage />}></Route>
//       <Route path="/admin/staffs/:id" element={<DashboardStaffsDetailsPage />}></Route>
//       <Route path="/admin/users/manage" element={<AccountUsers />}></Route>
//     </Routes>
//   );
// };


// export default App;




export default function App() {

    useEffect(() => {
        let pageViews = ReactGA.pageview(window.location.pathname + window.location.search);
        console.log("TRACKING PAGE VIEWS: ", pageViews);
    }, []);
    
    const routes = useRoutes([       
        { path: "/", element: <OurProgress /> },
        { path: "/home", element: <Home /> },
        { path: "/donations", element: <DonationPage /> },
        // { path: "/user/verify/:token", element: <SignUpVerification /> },
        { path: "/user/verify/:token", element: <VerifySignUp /> },
        { path: "/user/signup", element: <SignUp /> },
        { path: "/user/login", element: <SignIn /> },
        { path: "/admin/dashboard", element: <AdminDashboard /> },
        { path: "/admin/users", element: <DashboardUsersPage /> },
        { path: "/admin/staffs", element: <DashboardStaffsPage /> },
        { path: "/admin/users/:id", element: <DashboardUsersDetailsPage /> },
        { path: "/admin/staffs/:id", element: <DashboardStaffsDetailsPage /> },
        { path: "/admin/users/manage", element: <AccountUsers /> },
    ]);
    
    return routes;
};