import { useContext, useState } from "react";
import { Context } from "../context/UserContext";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const {user, dispatch, isFetching} = useContext(Context)

  const Msg = () => (
    <div>
      Username of password is false
    </div>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try{
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,{
        username,
        password
      })
      dispatch({type:"LOGIN_SUCCESS", payload: response.data})
    }catch(err){
      toast(<Msg />) 
      dispatch({type:"LOGIN_FAILURE"})
    }
  }

  return (
    <div className="h-[calc(100vh_-_50px)] flex flex-col items-center justify-center bg-white px-5 lg:px-0">
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
      <div className="card w-full lg:w-[25vw] h-2/3 lg:h-1/2 shadow-xl p-10 bg-blue-500">
        <span className="text-5xl font-bold font-rb text-center">Login</span>
        <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
          <label className="mx-0 my-2.5 font-rb">Username</label>
          <input className="bg-[white] p-2.5 rounded-[10px] border-[none] focus:outline-none" type="text" placeholder="Enter your username..." onChange={e=>setUserName(e.target.value)}/>
          <label className="mx-0 my-2.5 font-rb">Password</label>
          <input className="bg-[white] p-2.5 rounded-[10px] border-[none] focus:outline-none" type="password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)}/>
          <button className="cursor-pointer bg-green-500 text-[white] text-center mt-5 p-2.5 rounded-[10px] border-[none] hover:bg-white hover:text-green-500 duration-300" type="submit" disabled={isFetching}>Login</button>
        </form>
        <br/>
      </div>
    </div>
  );
}