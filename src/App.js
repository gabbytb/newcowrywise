import { Routes, Route } from "react-router-dom";
import { Home, SignUp, SignUpVerification, } from "./pages";





function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/signup" element={<SignUp />}></Route>
      <Route path="/user/verify/:token" element={<SignUpVerification />}></Route>
    </Routes>
  );
};
export default App;
