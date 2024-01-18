import Signup from "./components/auth/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import ClosedRoute from "./components/dashboard/ClosedRoute";
function App() {
  return (
    <div className='font-body'>
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<Signup></Signup>}></Route>
          <Route path='/dashboard' element={<ClosedRoute><Dashboard/></ClosedRoute>}></Route>
        </Routes>
      </div>
  );
}

export default App;
