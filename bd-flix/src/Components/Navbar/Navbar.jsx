import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserMinus } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaInfoCircle, FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../Context/Authprovider/Authprovider';

const Navbar = () => {

    const [active, setActive] = useState('home');
    const { user, logout } = useContext(AuthContext)
    const handlelogout = () => {
        logout()
            .then(() => { }).catch(error => console.error(error))
    }
    console.log(user)

    const nav = <>
        <li><Link to='/' className="text-green-700 hover:text-green-400 lg:text-3xl focus:outline-none focus:shadow-outline"><FaHome /></Link></li>
        <li><Link className="text-green-700 hover:text-green-400 lg:text-3xl focus:outline-none focus:shadow-outline">  <FaVideo /></Link></li>
        <li><Link className="text-green-700 hover:text-green-400 lg:text-3xl focus:outline-none focus:shadow-outline">  <FaEnvelope /></Link></li>
        <li><Link className="text-green-700 hover:text-green-400 lg:text-3xl focus:outline-none focus:shadow-outline">  <FaInfoCircle /></Link></li>


        {user?.uid ?
            <>



                <li className="text-green-700 hover:text-green-400 lg:text-3xl focus:outline-none focus:shadow-outline" onClick={handlelogout} ><Link to='/login'><FaUserMinus /></Link></li>

            </>
            :
            <li><Link to='/login' className="text-green-700 hover:text-green-400 lg:text-3xl focus:outline-none focus:shadow-outline">  <FaUserPlus /></Link></li>

        }


    </>

    const bottomNav = <>
        <Link to='/'
            className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'home' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('home')}
        >
            <FaHome />
        </Link>
        <Link to='/media'
            className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'media' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('media')}
        >
            <FaVideo />
        </Link>
        <Link
            className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'message' ? 'bg-green-700' : ''}`}
            onClick={() => setActive('message')}
        >
            <FaEnvelope />
        </Link>
        {
            user?.uid ?
                <>
                    <Link to='/profile'
                        className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'profile' ? 'bg-green-700' : ''}`}
                        onClick={() => setActive('profile')}
                    >
                        <div className="avatar-group -space-x-6">
                            <div className={user.photoURL}>
                                <div className="w-10">
                                    <img src="" alt="" />
                                </div>
                            </div>

                        </div>
                    </Link>
                </>
                :
                <>
                    <Link to='/profile'
                        className={`text-2xl text-center py-2 px-6 rounded-full hover:bg-green-700 cursor-pointer ${active === 'profile' ? 'bg-green-700' : ''}`}
                        onClick={() => setActive('profile')}
                    >
                        <div className="avatar-group -space-x-6">
                            <div className="avatar">
                                <div className="w-10">
                                    <img src="" alt="" />
                                </div>
                            </div>

                        </div>
                    </Link>
                </>
        }
    </>
    return (
        <>
            <div className="navbar bg-black">
                <div className="navbar-start">
                    {/* <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {nav}
                        </ul>
                    </div> */}

                    <div className='flex gap-2'>
                        <h1 className='btn rounded font-serif shadow-inner bg-green-700 text-xl font-bold text-white'>BD-FLIX</h1>
                        <input type="text" placeholder="Search Movies" className="input lg:w-full h-10 rounded-3xl bg-[#3a3b3c] max-w-xs" />
                    </div>


                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal flex justify-between w-96 px-1">
                        {nav}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/profile" className=' md:block lg:block hidden'>
                        <div className="avatar-group -space-x-6">
                            <div className="avatar">
                                <div className="w-12">
                                    <img src="" alt="" />
                                </div>
                            </div>
                        </div>
                    </Link>
                    {/* <button onClick={handleLogOut} className='btn bg-orange-600 rounded-3xl text-white'>LogOut</button> */}
                </div>
            </div>

            {/* ****************************************************************** */}
            {/* bottom navigation bar */}
            {/* ****************************************************************** */}

            <div className="lg:hidden md:hidden fixed bottom-0 w-full z-50">
                <div className="bg-black shadow-lg px-6">
                    <div className="flex items-center justify-between">
                        {
                            bottomNav
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;