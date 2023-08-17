import axios from "axios"
import { useState } from "react"
import { generatePassword } from "../helper/passwordGenerator"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const Msg = () => (
      <div>
        There is an empty field
      </div>
    )

    const handleSubmit = async (e) => {
      e.preventDefault()
      setError(false)
      try{

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`,{
        username: user,
        password,
        email
      }) 
      response.data && window.location.replace("/login")
    } catch (error){
        setError(true)
        toast(<Msg />)
    } finally {
      setEmail('')
      setPassword('')
      setUser('')
      }
    }

    const handleGenerate = (e) => {
      e.preventDefault()
      const password = generatePassword()
      setPassword(password)
    }

    return (
      <div className="h-[calc(100vh_-_50px)] flex flex-col items-center justify-center bg-white">
        <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
        <div className="card w-full lg:w-[25vw] shadow-xl p-10 bg-blue-500">
          <span className="text-[50px] text-center font-rb">Register</span>
          <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
            <label className="mx-0 my-2.5 font-rb">Username</label>
            <input className="bg-[white] p-2.5 rounded-[10px] border-[none] focus:outline-none" type="text" autoComplete="true" placeholder="Enter your username..." onChange={e=>setUser(e.target.value)}/>
            <label className="mx-0 my-2.5 font-rb">Email</label>
            <input className="bg-[white] p-2.5 rounded-[10px] border-[none] focus:outline-none" type="text" autoComplete="true" placeholder="Enter your email..." onChange={e=>setEmail(e.target.value)}/>
            <label className="mx-0 my-2.5 font-rb">Password</label>
            <div className="flex items-center justify-between">
              <input className="bg-[white] p-2.5 rounded-[10px] border-[none] focus:outline-none" type="text" autoComplete="current-password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)} value={password}/>
              <button className="cursor-pointer bg-sky-300 text-[white] text-center p-2.5 rounded-[10px] border-[none]" type="submit" onClick={handleGenerate}>Generate Password</button>
            </div>
            <button className="cursor-pointer bg-teal-500 text-[white] text-center mt-5 p-2.5 rounded-[10px] border-[none]">Register</button>
          </form>
          <button className="bg-green-500 cursor-pointer text-[white] mt-5 p-2.5 rounded-[10px] border-[none]">Login</button>
        </div>
        <br/>
    </div>
    )
}