import React, { useEffect, useState } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useStateValue } from "../StateContext/StateProvider";
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import { AppBar } from "@material-ui/core";
import logo from '../Images/favicon.png'
import useDarkMode from "../Helpers/useDarkMode";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import axios from "axios";
import { apiUrl } from "../API/apiUrl";
import Text from "./Text";

export default function Navbar(props) {
    //for settin the dark theme
    const [colorTheme, setTheme] = useDarkMode()
    const [navbarOpen, setNavbarOpen] = useState(false);
    const user = localStorage.getItem('zomuser')
    const [globCurrency, setGlobCurrency] = useState('')
    const history = useHistory()
    const [{ basket }, dispatch] = useStateValue()
    const [apiCats, setApiCats] = useState()

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('zomtoken')
        localStorage.removeItem('zomuser')
        dispatch({
            type: 'SET_USER',
            user: null
        })
        setTimeout(() => {
            history.push('/')
        }, 1500);
    }

    useEffect(() => {
        dispatch({
            type: 'SET_CURRENCY',
            currency: globCurrency
        })
    }, [globCurrency])

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch(`${apiUrl}/category/all`)
            .then(response => response.json())
            .then(data => setApiCats(data.categories));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
        // console.log(apiCats)

    }, [])


    return (
        <AppBar elevation={0}>
            <nav className={"bg-white dark:bg-gray-900 shadow  flex flex-wrap items-center justify-between px-2 py-3 border-b border-gray-200 dark:border-gray-700 navbar-expand-lg"}>
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full flex flex-row items-center justify-between lg:w-auto lg:static lg:justify-start">

                        <div className="flex md:flex-row w-full flex-col items-center">
                            <div className="itt flex w-full flex-row items-center">
                                <Link to='/' className="px-3 p-2 flex items-center flex-row">
                                    <img src={logo} alt="logo" className="md:w-8 w-8 " />
                                    <p className="md:mr-16 mr-2 md:font-semibold md:flex hidden text-sm text-gray-700 dark:text-white">WeLink</p>
                                </Link>
                                {/* search bar */}
                                <div className="w-full">
                                    <NavSearch />
                                </div>
                                <div className="flex md:hidden items-center">
                                    <span onClick={() => setTheme(colorTheme)} className={"text-gray-700 text-xs cursor-pointer font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                    >
                                        {colorTheme === 'light' ? (<span className="dark:text-white dark:hover:bg-gray-700 p-2 rounded">
                                            <Brightness4Icon fontSize="small" />
                                        </span>) : (<span className="hover:bg-gray-200 rounded p-2">
                                            <Brightness2Icon fontSize="small" />
                                        </span>)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex w-full md:w-auto flex-row justify-between items-center">
                                <div className="flex items-center">
                                    <Link to='/cart'
                                        className="text-gray-700 dark:text-white dark:hover:text-gray-200 hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                                    >
                                        <span className="flex flex-row items-center">
                                            <Badge badgeContent={basket.length} color="error">
                                                <ShoppingCartIcon />
                                            </Badge>
                                            {/* <p className="text-gray-800 hover:text-gray-600">Cart</p> */}
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex items-center">
                                    <select
                                        defaultValue=""
                                        onChange={e => setGlobCurrency(e.target.value)}
                                        id="bidder"
                                        className="border border-gray-400 dark:border-green-600 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-white py-2 px-3 cursor-pointer hover:bg-gray-100 text-gray-700 md:text-md text-xs rounded-full outline-none ml-2">
                                        <option value="zwl">ZWL</option>
                                        <option value={'usd'}>USD</option>
                                    </select>
                                </div>
                                <button
                                    className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                    type="button"
                                    onClick={() => setNavbarOpen(!navbarOpen)}
                                >
                                    <MenuIcon className="text-gray-800 dark:text-white" />
                                </button>

                            </div>
                        </div>

                    </div>

                    <div
                        className={
                            "lg:flex flex-grow items-center dark:bg-gray-900 bg-white lg:bg-transparent lg:shadow-none" +
                            (navbarOpen ? " block rounded shadow" : " hidden")
                        }
                        id="example-navbar-warning"
                    >
                        <ul className="flex flex-col items-center lg:flex-row list-none lg:ml-auto">


                            {JSON.parse(user)?.role === "seller" ? <>
                                <li className="md:flex hidden items-center">
                                    <span onClick={() => setTheme(colorTheme)} className={"text-gray-700 text-xs cursor-pointer font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
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
                                <Link to='/dashboard'>

                                    <li className={"text-white active:bg-pink-600" +
                                        " text-xs font-bold text-gray-800 dark:text-white dark:hover:text-gray-200 uppercase px-4 py-3 rounded pointer-cursor outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                        style={{ transition: "all .15s ease" }}>
                                        <p>My Store</p>
                                    </li>
                                </Link>

                                <li className="flex items-center">
                                    <Link to='/howitworks'
                                        className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                    >
                                        How It Works?
                                    </Link>
                                </li>

                                <li className="flex items-center cursor-pointer">
                                    <span onClick={logout}
                                        className={"text-gray-700 dark:text-white dark:hover:text-gray-200 active:bg-yellow-300 cursor-pointer text-xs font-bold uppercase py-1 px-2 rounded-full outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                    >
                                        <PowerSettingsNewIcon />
                                    logout
                                    </span>
                                </li>
                            </> :
                                JSON.parse(user)?.role === 'buyer' ? (
                                    <>
                                        {/* <li>
                                            <span onClick={() => setTheme(colorTheme)}>
                                                {colorTheme === 'light' ? ('light') : ('dark')}
                                            </span>
                                        </li> */}

                                        <li className="flex items-center">
                                            <Link to='/howitworks'
                                                className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                How It Works?
                                            </Link>
                                        </li>

                                        <li className="flex items-center">
                                            <Link to='/about'
                                                className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                About
                                            </Link>
                                        </li>
                                        <li className="flex items-center">
                                            <Link to='/login'
                                                className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                Sign In
                                            </Link>
                                        </li>

                                        <li className="flex items-center">
                                            <Link to='/becomeaseller'
                                                className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                Become A Seller
                                            </Link>
                                        </li>
                                        <li className="flex items-center cursor-pointer">
                                            <span onClick={logout}
                                                className={"text-gray-700 active:bg-yellow-300 cursor-pointer text-xs font-bold uppercase py-1 px-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"}

                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                <PowerSettingsNewIcon />
                                                logout
                                                </span>
                                        </li>
                                    </>
                                ) : (<>
                                    <li className="md:flex hidden items-center">
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

                                    <li className="flex items-center">
                                        <Link to='/howitworks'
                                            className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                            type="button"
                                            style={{ transition: "all .15s ease" }}
                                        >
                                            How It Works?
                                        </Link>
                                    </li>

                                    <li className="flex items-center">
                                        <Link to='/about'
                                            className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                            type="button"
                                            style={{ transition: "all .15s ease" }}
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <div className="flex flex-row items-center">
                                        <li className="flex items-center">
                                            <Link to='/login'
                                                className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-3 mb-3"}
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >

                                                Sign In
                                        </Link>
                                        </li>
                                        {/* <li>
                                            <span onClick={() => setTheme(colorTheme)}>
                                                {colorTheme === 'light' ? ('light') : ('dark')}
                                            </span>
                                        </li> */}
                                        <li className={"text-gray-700 dark:text-white active:bg-green-300 text-xs font-bold uppercase py-1 outline-none focus:outline-none lg:mb-0 mb-3"}>/</li>
                                        <li className="flex items-center">
                                            <Link to='/register'
                                                className={"text-gray-700 dark:text-white dark:hover:text-gray-200 text-xs font-bold uppercase lg:mr-1 lg:mb-0 ml-1 mb-3"}
                                                type="button"
                                                style={{ transition: "all .15s ease" }}
                                            >

                                                Register
                                        </Link>
                                        </li>
                                    </div>
                                </>)
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </AppBar>
    );
}

const NavSearch = () => {
    const [searchItem, setSearchItem] = useState('')
    // eslint-disable-next-line
    const [{ }, dispatch] = useStateValue()

    const searchFromApi = (e) => {
        e.preventDefault()
        dispatch({
            type: 'SET_SEARCH',
            search: ({
                searchItem: searchItem,

            })
        })
    }


    return (
        <>
            <form onSubmit={searchFromApi} className="flex flex-row flex-1 w-full dark:bg-gray-800 items-center border border-green-600 pl-2 rounded-full overflow-hidden">
                <input
                    onChange={e => setSearchItem(e.target.value)}
                    type="text"
                    placeholder="I'm looking for"
                    className="p-1 w-full outline-none text-gray-700 dark:text-gray-300 dark:placeholder-gray-300 dark:bg-gray-800 bg-white text-sm border-none" />
                <span onClick={searchFromApi} className="outline-none dark:text-green-600 border-none rounded-l-none rounded-full border border-blue-900 text-green-500 font-semibold py-1 px-2">
                    <SearchIcon fontSize="small" />
                </span>
            </form>
        </>
    )
}
