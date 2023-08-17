import { useContext } from "react"
import { Link } from "react-router-dom"
import { Context } from "../context/UserContext"

export default function Topbar() {
    const {user, dispatch   } = useContext(Context)
    const images = `${import.meta.env.VITE_BACKEND_IMG}/images/`

    const handleLogout = () => {
        dispatch({type:"LOGOUT"})
        window.location.replace("/login")
    }

  return (
    <>
    {user ? (
        <div className="navbar bg-sky-500">
        <div className="navbar-start">
        <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-sky-500 rounded-box w-52 no-underline">
                <li>
                    <Link to={'/'} className='text-inherit'>Home</Link>
                </li>
                <li><a>About</a></li>
                <li><a>Contact</a></li>
                <li>
                    <Link to={'/write'} className='text-inherit'>Write</Link>
                </li>
                <li onClick={handleLogout}><a>Logout</a></li>

            </ul>
        </div>
        <div className='flex'>
            <div className="w-9 h-9 mx-3 rounded-full flex justify-center items-center duration-700 text-white hover:text-[#1572B6]">
                <a href="#" target='_blank'>
                    <svg className="fill-current" width="30" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
            </div>
                <a href="#" target='_blank'>
                    <div className="w-9 h-9 mx-3 rounded-full flex justify-center items-center duration-700 text-white hover:text-sky-400">
                        <svg className="fill-current" width="30" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z"/></svg>
                    </div>
                </a>
            </div>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li>
                    <Link to={'/'} className='text-inherit'>Home</Link>
                </li>
                <li><a>About</a></li>
                <li><a>Contact</a></li>
                <li>
                    <Link to={'/write'} className='text-inherit'>Write</Link>
                </li>
                <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
        </div>
        <div className="navbar-end">
            <div className='flex gap-5 items-center'>
                <Link to={'/settings'}>
                    <img src={images + user.picture} className='rounded-full w-10 h-10 object-cover' alt="Profile Picture"/>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </div>
            </div>
        </div>
    ) : (
        <div className="navbar bg-sky-500">
        <div className="navbar-start"/>
        <div className="navbar-center hidden lg:flex"/>
            <div className="navbar-end">
                <div className='flex gap-5 items-center'>
                    <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to={'/login'} className='text-inherit'>Login</Link>
                    </li>
                    <li>
                        <Link to={'/register'} className='text-inherit'>Register</Link>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

