import React, { useCallback, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import General from './General'
import ReceiptIcon from '@material-ui/icons/Receipt';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CommentIcon from '@material-ui/icons/Comment';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { apiUrl } from '../API/apiUrl';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(25),
        height: theme.spacing(25),
    },
}));

function SellerPage({ children }) {
    const classes = useStyles();
    const storeowner = localStorage.getItem('curstoreowner')
    const [currentUser, setCurrentUser] = useState({})
    const [userLoading, setUserLoading] = useState(false)

    const getCurrentUser = useCallback(() => {
        setUserLoading(true)
        axios.get(`${apiUrl}/user/${JSON.parse(storeowner).owner}`).then((res) => {
            setCurrentUser(res.data)
            setUserLoading(true)
        }).catch((err) => {
            console.log(err)
        })
        console.log(currentUser)
        console.log(userLoading)
    },[storeowner, currentUser, userLoading])

    useEffect(() => {
        getCurrentUser()
    }, [getCurrentUser])

    return (
        <General>
            <>
                <main className="profile-page">
                    <section className="relative block lg:h-80 md:h-56 h-40">
                        <div
                            className="absolute top-0 w-full h-full bg-center bg-cover"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')"
                            }}
                        >
                            <span
                                id="blackOverlay"
                                className="w-full h-full absolute opacity-50 bg-black"
                            ></span>
                        </div>
                    </section>
                    <section className="relative py-16 bg-gray-50 dark:bg-gray-900">
                        <div className="container mx-auto md:px-16 px-4">
                            <div className="relative flex flex-col min-w-0 break-words bg-white dark:bg-gray-800 w-full shadow rounded-md -mt-28">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-between">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="relative">
                                                <div className="shadow-xl bg-white rounded-full h-auto align-middle border-none absolute md:-m-24 -m-20 -ml-24 lg:-ml-24">
                                                    <Avatar alt="Remy Sharp" src={JSON.parse(storeowner).userpic} className={classes.large} />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                            <div className="py-8 md:px-3 pl-16 mt-32 sm:mt-0">
                                                <span
                                                    className="text-gray-700 dark:text-gray-200 flex flex-row items-center active:bg-pink-600 font-semibold px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                >
                                                    <p>{currentUser?.username}</p>
                                                    {currentUser?.verified === 'yes' ? (<div className="text-green-600 flex flex-row items-center">
                                                        <VerifiedUserIcon fontSize="small" />
                                                        <p className="bg-gray-300 dark:bg-gray-700 rounded p-1 text-xs">Verified</p>
                                                    </div>) : (
                                                        <div className="ver bg-gray-300 dark:bg-gray-700 rounded p-1 text-xs">
                                                            <p className="dark:text-gray-300 text-gray-800">Not Verified</p>
                                                        </div>
                                                    )}


                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                            <div className="flex justify-center py-4 lg:pt-4">
                                                <Link to='/shop' className="mr-4 p-3 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm">
                                                    <span className="text-xl font-bold block uppercase tracking-wide dark:text-white text-gray-700">
                                                        <ReceiptIcon />
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-white">Products</span>
                                                </Link>
                                                <Link to='/shopabout' className="mr-4 p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm cursor-pointer">
                                                    <span className="text-xl font-bold block uppercase tracking-wide text-gray-700 dark:text-white">
                                                        <InfoOutlinedIcon />
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-white">About</span>
                                                </Link>
                                                <Link to='/shopreviews' className="lg:mr-4 p-3 text-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm cursor-pointer">
                                                    <span className="text-xl dark:text-white font-bold block uppercase tracking-wide text-gray-700">
                                                        <CommentIcon />
                                                    </span>
                                                    <span className="text-sm text-gray-500 dark:text-white">Reviews</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rest">
                            <div className="bg-gray-50 dark:bg-gray-900">
                                {children}
                            </div>
                        </div>
                    </section>
                </main>
            </>
        </General>
    )
}

export default SellerPage
