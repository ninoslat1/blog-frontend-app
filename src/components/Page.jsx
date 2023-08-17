import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from 'axios'
import { Context } from "../context/UserContext";

export default function Page() {
  const location = useLocation()
  const path = location.pathname.split("/")[2]
  const [post, setPost] = useState({})
  const images = `${import.meta.env.VITE_BACKEND_IMG}/images/`
  const {user} = useContext(Context)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [update, setUpdate] = useState(false)

  const handleDelete = async () => {
    try{
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}`, 
        {data:{username: user.username},
      })
      window.location.replace('/')
    }
    catch(err){
      console.log(err)
    }
  }

  const handleEdit = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      window.location.reload()
      setUpdate(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=> {
    const getPost = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/` + path)
      setPost(response.data)
      setTitle(response.data.title)
      setDesc(response.data.desc)
    }

    getPost()
  },[path])

  return (
    <div className="flex-[9]">
      <div className="p-5">
        {post.photo && 
          <img
            className=" w-full h-[50vh] object-cover"
            src={images + post.photo}
            alt="Blog Image"
          />
        }
        {update ? (<input type='text' value={title} className='text-[28px] w-full text-center text-[gray] m-2.5 focus:outline-none' onChange={(e) => setTitle(e.target.value)} autoFocus={true}/>) : (
        <h1 className="text-center text-[28px] m-2.5">
          {post.title}
          {post.username === user?.username &&
          <div className="float-right text-base flex gap-5">
            <i className="cursor-pointer"onClick={() => setUpdate(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </i>
            <i className="cursor-pointer" onClick={handleDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </i>
          </div>
          }
        </h1>
        )}
        <div className="flex justify-between text-base text-[#be9656] mb-5">
          <span>
            Author:
            <b className="ml-[5px]">
              <Link className="no-underline text-inherit" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {update ? (<textarea className="text-[#666] text-lg leading-[25px] w-full text-justify" value={desc} onChange={(e) => setDesc(e.target.value)}/>) : (
        <p className="text-[#666] text-lg leading-[25px] first-letter:text-3xl first-letter:uppercase first-letter:font-semibold first-letter:ml-10 text-justify">
          {post.desc}
        </p>
        )}
        {update && (
          <button className=" bg-[teal] text-[white] cursor-pointer self-end mt-5 p-[5px] rounded-[5px] border-[none]" onClick={handleEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
