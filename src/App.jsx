import Topbar from "./components/Topbar";
import Home from "./components/Home";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Settings from "./pages/Settings";
import Single from "./pages/Single";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from "./pages/Homepage";
import { useContext } from "react";
import { Context } from "./context/UserContext";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const {user} = useContext(Context)
  return (
    <BrowserRouter>
      <Topbar/>
      <Routes>
        <Route exact path="/" element={user ? <Homepage/> : <Login/>}/>
        <Route path="/register" element={user ? <Home/>:<Register/>}/>
        <Route path="/login" element={user? <Homepage/> : <Login/>}/>
        <Route path="/write" element={user? <Write/> : <Login/>}/>
        <Route path="/settings" element={user? <Settings/> : <Login/>}/>
        <Route path="/post/:postId" element={<Single/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
