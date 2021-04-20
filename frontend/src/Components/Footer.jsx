import React from 'react'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import CopyrightOutlinedIcon from '@material-ui/icons/CopyrightOutlined';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png'

//footer conrtainer
function Footer() {
    return (
        <div className="bg-gray-200 dark:bg-black flex flex-col md:flex-col">
            <div className="flex justify-between p-16 items-center flex-col md:flex-row">
                <Link to='/' className="logo flex flex-row items-center hover:text-gray-500">
                    <img src={logo} alt="logo" className="w-36" />
                    {/* <p className="text-gray-700 font-bold">ZimOnlineMarket</p> */}
                </Link>
                <div className="flex flex-col text-gray-700 dark:text-white text-sm">
                    <p>About Us</p>
                    <p>How It Works</p>
                    <p>Explore sellers</p>
                    <p>Our Categories</p>
                </div>
                <div className="flex flex-col text-gray-700 dark:text-white text-sm">
                    <p>Help Center</p>
                    <p>Security</p>
                    <Link to='/explore' className="hover:text-gray-300">About</Link>
                </div>
                <div className="border-r border-gray-500 h-36 md:block hidden"></div>
                <div className="border-b border-white my-4 h-full md:hidden block"></div>
                <div className="flex flex-col text-gray-400">
                    <span className="bg-white border-2 border-gray-300 px-2 outline-none rounded flex flex-row items-center">
                        <input type="text" className="bg-transparent outline-none p-2" placeholder="Email Us"/>
                        <SendOutlinedIcon fontSize="small"/>
                    </span>
                </div>
                
            </div>

            <div className="bg-black p-3 items-center flex flex-row px-8">
                <div className="flex flex-row items-center text-gray-400">
                    <CopyrightOutlinedIcon fontSize="small"/>
                    <p className="text-xs">ZimOnlineMarket. 2021</p>
                </div>
                <div className="flex-1"></div>
                <div className="flex flex-row text-gray-400">
                    <FacebookIcon className="mr-4" fontSize="small"/>
                    <TwitterIcon className="mr-4" fontSize="small"/>
                    <InstagramIcon className="mr-4" fontSize="small"/>
                </div>
            </div>
        </div>
    )
}

export default Footer
