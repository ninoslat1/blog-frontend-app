import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { Context } from "../context/UserContext";
import axios from "axios";

export default function Settings() {
  const {user, dispatch} = useContext(Context)
  const [file, setFile] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [success, setSuccess] = useState(false)
  const images = `${import.meta.env.VITE_BACKEND_IMG}/images/`

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type:'UPDATE_START'})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    }

    if(file){
      const data = new FormData();
      const filename = file.name
      data.append("name", filename)
      data.append("file", file)
      updatedUser.picture = filename
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, data)
      }catch(err){

      }
      try{
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/users/`+user._id, updatedUser)
        dispatch({type:'UPDATE_SUCCESS', payload: response.data})
        setSuccess(true)
        window.location.reload()
      }catch(err){
        dispatch({type:'UPDTAE_FAILURE'})
      }
    }
  }

  return (
    <div className="flex">
      <div className="flex-[9] p-5">
        <div className="flex items-center justify-between">
          <span className="text-3xl text-[lightcoral] mb-5">Update Your Account</span>
          <span className="text-[red] text-xs cursor-pointer">Delete Account</span>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-xl mt-5">Profile Picture</label>
          <div className="flex items-center my-2.5">
            <img
              src={file ? URL.createObjectURL(file) : images + user.picture}
              alt="Profile Picture"
              className="h-[70px] w-[70px] object-cover rounded-[20px]"
            />
            <label className="text-xl mt-5" htmlFor="fileInput">
              <i className="w-[25px] h-[25px] flex justify-center items-center text-[white] bg-[lightcoral] cursor-pointer ml-2.5 p-[5px] rounded-[50%] border-[none] focus:outline-none far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="w-[30%] text-[gray] h-[30px] my-2.5 border-b-[lightgray] border-[none] border-b border-solid"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label className="text-[gray] h-[30px] my-2.5 border-b-[lightgray] border-[none] border-b border-solid text-xl mt-5">Username</label>
          <input type="text" placeholder={user.username} name="name" onChange={e=>setUsername(e.target.value)}/>
          <label className="text-[gray] h-[30px] my-2.5 border-b-[lightgray] border-[none] border-b border-solid text-xl mt-5">Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={e=>setEmail(e.target.value)}/>
          <label className="text-[gray] h-[30px] my-2.5 border-b-[lightgray] border-[none] border-b border-solid text-xl mt-5">Password</label>
          <input type="password" placeholder="Password" name="password" onChange={e=>setPassword(e.target.value)}/>
          <button className="self-center w-[150px] text-[white] bg-[teal] cursor-pointer flex items-center justify-center mt-5 p-2.5 rounded-[10px] border-[none] hover:bg-[rgb(1,114,114)]" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}