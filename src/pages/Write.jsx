import axios from "axios";
import { useContext, useState, useEffect } from "react"
import { Context } from "../context/UserContext";

export default function Write() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [cat, setCat] = useState([])
  const [file, setFile] = useState(null)
  const {user} = useContext(Context)

  useEffect(() => {
    async function fetchCat() {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/categories`;
      try {
        const res = await axios.get(URL);
        console.log(res.data);
        setCat(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCat();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      username: user.username,
      title,
      desc,
      categories
    }

    if(file){
      const data = new FormData();
      const filename = file.name
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload`, data)
      }catch(err){

      }
      try{
        const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts`, newPost)
        window.location.replace('/posts/' + response.data._id)
      }catch(err){

      }
    }
  }

  return (
    <div className="pt-[50px]">
      {file &&
      <img
        className="w-[70vw] h-[250px] object-cover ml-[150px] rounded-[10px]"
        src={URL.createObjectURL(file)}
        alt="Blog Image"
      />
      }
      <div>
          {cat.map((c) => {
            return <p key={c._id}>{c.name}</p>
          })}
        </div>
      <form className="relative" onSubmit={handleSubmit}>
        <div className="flex items-center ml-[150px]">
          <label htmlFor="fileInput">
            <i className="w-[25px] h-[25px] text-xl border text-[rgb(129,125,125)] flex items-center justify-center cursor-pointer rounded-[50%] border-solid">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </i>
          </label>
          <input id="fileInput" type="file" style={{ display: "none" }} onChange={e=>setFile(e.target.files[0])}/>
          <input
            className="text-3xl w-[70vw] p-5 border-[none] placeholder:text-[rgb(189,185,185)] placeholder:font-normal focus:outline-none"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center ml-[150px]">
          <textarea
            className="text-md w-[70vw] p-5 border-[none] placeholder:text-[rgb(189,185,185)] placeholder:font-normal focus:outline-none h-screen"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={e=>setDesc(e.target.value)}
          />
        </div>
        <button className="absolute text-[white] bg-[teal] text-base cursor-pointer flex items-center p-2.5 rounded-[10px] border-[none] right-[50px] top-5" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}