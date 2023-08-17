import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Sidebar() {
  const [cats, setCats] = useState([])
  
  useEffect(() => {
    const getCats = async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/categories`)
      setCats(response.data)
    }

    getCats()
  },[])
  
  return (
    <div className="w-[25vw] h-fit bg-[#fdfbfb] flex-col items-center pb-[30px]">
      <div className="flex flex-col items-center">
        <span className="mx-auto text-center text-xs leading-[19px] text-[#222222] font-semibold m-2.5 p-[5px] border-y-[solid] border-y-[#a7a4a4]">About Me</span>
        <img src="" className='rounded-full w-20 h-20 object-cover' alt="Profile Picture"/>
        <p className="p-[30px]">
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <span className=" w-4/5 text-center text-xs leading-[19px] text-[#222222] font-semibold m-2.5 p-[5px] border-y-[solid] border-y-[#a7a4a4]">Categories</span>
        <ul className="list-none mx-auto py-5">
          {cats.map((cat) => (
            <li className="inline-block w-1/2 cursor-pointer mt-[15px]" key={cat._id}>
              <Link className="no-underline text-inherit" to={`/?cat=${cat.name}`}>
                {cat.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-cente">
        <span className="ext-center text-xs leading-[19px] text-[#222222] font-semibold mx-auto py-5 border-y-[solid] border-y-[#a7a4a4]">Follow Us</span>
        <div className="flex items-center justify-center mt-[15px]">
            <div className='flex'>
                <div className="w-9 h-9 mx-3 rounded-full flex justify-center items-center duration-700 text-white hover:text-[#1572B6]">
                    <div className="w-9 h-9 mx-3 rounded-full flex justify-center items-center duration-700 text-black hover:text-[#1572B6]">
                        <a href="#" target='_blank'>
                            <svg className="fill-current" width="30" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                    </div>
                </div>
                <div>
                    <a href="#" target='_blank'>
                        <div className="w-9 h-9 mx-3 rounded-full flex justify-center items-center duration-700 text-black hover:text-sky-400">
                            <svg className="fill-current" width="30" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z"/></svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}