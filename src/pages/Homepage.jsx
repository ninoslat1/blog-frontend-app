import { useLocation } from "react-router";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Homepage() {
  const [posts, setPosts] = useState([])
  const {search} = useLocation()

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts` + search)
      setPosts(response.data)
    }
    fetchPost()
  },[search])
  
  return (
    <>
      <Header />
      <div className="flex">
        <Posts post={posts}/>
        <Sidebar />
      </div>
    </>
  );
}