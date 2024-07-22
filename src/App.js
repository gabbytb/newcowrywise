import { useEffect } from "react";
import ReactGA from 'react-ga';
import { Routes, Route } from 'react-router-dom';
import { 
  Home,
  OurProgress, DonationPage,
  Register,
  SignUp, SignUpVerification, SignUpReVerification,
  Login, 
  AdminDashboard, 
  DashboardUsersPage, DashboardUsersDetailsPage,
  DashboardStaffsPage, DashboardStaffsDetailsPage,
  AccountUsers,
} from "./pages";

// PRODUCTION Data for Travelbeta Blog
// const TRACKING_ID = "UA-277984631-1";   // OLD_TRACKING_ID
// const TRACKING_ID = "397205433";        // NEW_TRACKING_ID


// DEVELOPMENT Data
const TRACKING_ID = "UA-220438183-5";
ReactGA.initialize(TRACKING_ID);








const App = () => {
  
  useEffect(() => {
    var pageViews = ReactGA.pageview(window.location.pathname + window.location.search);
    console.log("TRACKING PAGE VIEWS: ", pageViews);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/our-progress" element={<OurProgress />}></Route>
      <Route path="/donations" element={<DonationPage />}></Route>
      <Route path="/user/signup-two" element={<SignUp />}></Route>
      <Route path="/user/signup" element={<Register />}></Route>

      <Route path="/user/verify?token=:token" element={<SignUpVerification />}></Route>
      <Route path="/user/verify" element={<SignUpReVerification />}></Route>
      <Route path="/user/login" element={<Login />}></Route>

      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/admin/users" element={<DashboardUsersPage />}></Route>
      <Route path="/admin/staffs" element={<DashboardStaffsPage />}></Route>
      <Route path="/admin/users/:id" element={<DashboardUsersDetailsPage />}></Route>
      <Route path="/admin/staffs/:id" element={<DashboardStaffsDetailsPage />}></Route>
      <Route path="/admin/users/manage" element={<AccountUsers />}></Route>
    </Routes>
  );
};

export default App;

