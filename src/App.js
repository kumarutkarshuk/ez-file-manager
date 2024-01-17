import Signup from "./components/auth/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
function App() {
  return (
    <div className='font-body'>
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<Signup></Signup>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </div>
  );
}

export default App;
