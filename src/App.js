import { Routes, Route } from "react-router-dom";
import { 
  Home,
  OurProgress, DonationPage,
  SignUp, SignUpVerification, SignUpReVerification,
  Login, 
  AdminDashboard, AccountUsers,
} from "./pages";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/our-progress" element={<OurProgress />}></Route>
      <Route path="/donations" element={<DonationPage />}></Route>
      <Route path="/user/signup" element={<SignUp />}></Route>
      <Route path="/user/verify/:token" element={<SignUpVerification />}></Route>
      <Route path="/user/verify" element={<SignUpReVerification />}></Route>
      <Route path="/user/login" element={<Login />}></Route>
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/admin/users/manage" element={<AccountUsers />}></Route>
    </Routes>
  );
};
export default App;
