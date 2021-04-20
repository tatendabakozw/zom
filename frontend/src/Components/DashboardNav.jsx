import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar } from "@material-ui/core";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import logo from '../Images/logo.png'
import Badge from '@material-ui/core/Badge';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import StoreIcon from '@material-ui/icons/Store';
import { apiUrl } from '../API/apiUrl';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import useDarkMode from '../Helpers/useDarkMode';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
}));

function DashboardNav() {
    const [colorTheme, setTheme] = useDarkMode()
    const classes = useStyles();
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    const user = localStorage.getItem('zomuser')

    return (
        <AppBar position="fixed" elevation={0}>
            <nav className="bg-white dark:bg-gray-900 shadow border-b dark:border-gray-600 border-gray-200 flex flex-wrap items-center justify-between px-2 py-4 navbar-expand-lg">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full flex flex-row items-center justify-between lg:w-auto lg:static lg:justify-start">
                        <Link to='/' className="px-3 py-1 flex items-center text-xs capitalize font-bold">
                            <img src={logo} alt="logo" className="md:w-20 w-16 md:mr-8 mr-2" />
                        </Link>
                        <li className="flex items-center">
                            <span onClick={() => setTheme(colorTheme)} className={"text-gray-700 text-xs cursor-pointer font-bold uppercase "}
                                type="button"
                                style={{ transition: "all .15s ease" }}
                            >
                                {colorTheme === 'light' ? (<span className="dark:text-white dark:hover:bg-gray-700 p-2 rounded">
                                    <Brightness4Icon fontSize="small" />
                                </span>) : (<span className="hover:bg-gray-200 rounded p-2">
                                    <Brightness2Icon fontSize="small" />
                                </span>)}
                            </span>
                        </li>
                        <button
                            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}>
                            <MenuIcon className="text-gray-700 dark:text-white" />
                        </button>

                    </div>
                    <div
                        className={"lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" + (navbarOpen ? " block rounded shadow-lg" : " hidden")}
                        id="example-navbar-warning" >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
                            <li className="flex items-center">
                                <Link to='/dashboard'
                                    className="text-gray-700 hover:text-gray-600 dark:text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-semibold"
                                >
                                    <span className="dark:text-white dark:hover:text-gray-200 flex flex-row items-center hover:text-gray-600">
                                        <p>Dashboard</p>
                                    </span>
                                </Link>
                            </li>
                            {/* <li className="flex items-center">
                                <Link to='/messages'
                                    className="text-gray-700 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                                >
                                    <span className="text-gray-700 flex flex-row items-center hover:text-gray-600">
                                        <Badge badgeContent={1} color="error" variant="dot">
                                            <MailOutlineIcon fontSize="small" />
                                        </Badge>
                                        <p>Messages</p>
                                    </span>
                                </Link>
                            </li> */}
                            <li className="flex items-center">
                                <Link to='/inventory'
                                    className="text-gray-700 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-semibold"
                                >
                                    <span className="dark:text-white dark:hover:text-gray-200 flex flex-row items-center hover:text-gray-600">
                                        <StoreIcon fontSize="small" />
                                        <p>Store</p>
                                    </span>
                                </Link>
                            </li>
                            <li className="flex items-center">
                                <Link to='/orders' className="text-gray-700 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-semibold">
                                    <span className="dark:text-white dark:hover:text-gray-200 flex flex-row items-center hover:text-gray-600">
                                        <Badge badgeContent={1} color="error" variant="dot">
                                            <AnnouncementIcon fontSize="small" />
                                        </Badge>
                                        <p>Orders</p>
                                    </span>
                                </Link>
                            </li>
                            {/* <li className="flex items-center">
                                <Link to='/explore'
                                    className="text-gray-700 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-semibold"
                                >
                                    <p className="text-gray-700 hover:text-gray-600">Explore Sellers</p>
                                </Link>
                            </li> */}
                            <li className="flex items-center">
                                <Link className={classes.root} to='/account' className="dark:text-white dark:hover:text-gray-200 flex flex-row items-center hover:text-gray-600">
                                    <Avatar alt="Tatenda Bako" src={`${apiUrl}/${JSON.parse(user).picture[0].img}`} className={classes.small} />
                                    <p className="text-gray-700 dark:text-white ml-1 hover:text-gray-600">{JSON.parse(user).username}</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </AppBar>
    )
}

export default DashboardNav
