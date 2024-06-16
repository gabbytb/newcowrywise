import { Routes, Route } from "react-router-dom";
import { 
  Home, 
  SignUp, SignUpVerification, 
  Login, 
  AdminDashboard, AccountUsers,
} from "./pages";





function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/signup" element={<SignUp />}></Route>
      <Route path="/user/verify/:token" element={<SignUpVerification />}></Route>
      <Route path="/user/login" element={<Login />}></Route>
      <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
      <Route path="/admin/users/manage" element={<AccountUsers />}></Route>
    </Routes>
  );
};
export default App;
