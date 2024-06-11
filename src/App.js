import { Routes, Route } from "react-router-dom";
import { Home, Registration } from "./pages";




function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/signup" element={<Registration />} />
    </Routes>
  );
};
export default App;
