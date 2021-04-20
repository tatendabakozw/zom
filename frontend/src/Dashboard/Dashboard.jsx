import React from 'react'
import userIcon from '../Images/socialGirl.svg'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Link } from 'react-router-dom';
import StoreDashboard from '../Layout/StoreDashboard';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import inven from '../Images/inve.svg'
import orders from '../Images/orders.svg'
import { apiUrl } from '../API/apiUrl';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    ss:{
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));

function Dashboard() {
    const classes = useStyles();

    const user = localStorage.getItem('zomuser')

    return (
        <StoreDashboard>
            <div className="px-8 flex md:flex-row flex-col dark:bg-gray-900">
                <div className="left md:w-1/4 w-full">
                    <p className="text-gray-700 dark:text-white text-3xl md:flex hidden font-semibold mb-4">Dashboard</p>
                    <div className="bg-white dark:bg-gray-800 shadow rounded flex p-4 flex-col mb-4">
                        <img src={userIcon} alt="user" className="w-36 self-center" />
                        <p className="text-green-800 dark:text-green-500 font-semibold self-center">{JSON.parse(user).username}</p>
                        <div className="border-b w-full self-center border-gray-300 dark:border-gray-600 m-4"></div>
                        <div className="flex flex-row text-gray-500 dark:text-gray-300 items-center justify-around">
                            <p className="text-sm">Earned in April</p>
                            <p>$300</p>
                        </div>
                    </div>
                    <Link to='/messages' className="flex cursor-pointer flex-row text-sm rounded items-center text-gray-500 p-4 mb-4 bg-white dark:bg-gray-800 dark:text-white shadow">
                        <Avatar alt="Tatenda Bako" src={`${apiUrl}/${JSON.parse(user).picture[0].img}`} className={classes.ss} />

                        <p>My account</p>
                        <div className="flex-1"></div>
                        <p className="text-green-500">Edit</p>
                    </Link>
                    <Link to='/upgrade' className="flex flex-row text-sm rounded items-center mb-4 text-white p-4 bg-green-500 shadow">
                        <MonetizationOnIcon fontSize="small" />
                        <p>Upgrage to premium</p>
                        <div className="flex-1"></div>
                        <p className="text-white"><ArrowRightAltIcon /></p>
                    </Link>
                </div>
                <div className="right w-4/5 md:pl-14 mx-auto">
                    <div className="flex flex-col md:items-start items-center mb-8">
                        <p className="text-gray-500 dark:text-white font-semibold mb-4">Upgrade account</p>
                        <span className="bg-white dark:bg-gray-800 p-4 shadow rounded">
                            <p className="text-green-800 dark:text-green-500 text-xl font-semibold mb-1">Benifits of upgrading account</p>
                            <p className="text-gray-600 dark:text-white font-normal">Get unlimited uploads, get unlimited clients, But most importantly get featured as verified to customers and clients</p>
                        </span>
                    </div>
                    <div className="items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Link to='/inventory' className="col-span-1 border bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-800 rounded hover:shadow-lg p-2 flex flex-col items-center">
                            <p className="text-center text-xl text-gray-800 dark:text-gray-300 dark:text-white font-semibold mb-4">Inventory</p>
                            <div className="flex-1"></div>
                            <Avatar alt="inventory_svg" variant="square" src={inven} className={classes.small} />
                            <p className="text-center text-sm text-gray-500">Manage your products and prices</p>
                        </Link>
                        <Link to='/account' className="col-span-1  border bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-800 rounded hover:shadow-lg p-2 flex flex-col items-center">
                            <p className="text-center text-xl text-gray-800 dark:text-white font-semibold mb-4">Account</p>
                            <Avatar alt="Tatenda Bako" src={`${apiUrl}/${JSON.parse(user).picture[0].img}`} className={classes.small} />
                            <p className="text-center text-sm dark:text-gray-300 text-gray-500">Edit and or more to your account</p>
                        </Link>
                        <Link to='/orders' className="col-span-1 border bg-white border-gray-200 dark:border-gray-800 dark:bg-gray-800 rounded hover:shadow-lg p-2 flex flex-col items-center">
                            <p className="text-center text-xl text-gray-800 dark:text-white font-semibold mb-4">Orders</p>
                            <div className="flex-1"></div>
                            <Avatar alt="Tatenda Bako" variant="square" src={orders} className={classes.small} />
                            <p className="text-center dark:text-gray-300 text-sm text-gray-500">See who wants to buy from you</p>
                        </Link>
                    </div>
                </div>
            </div>
        </StoreDashboard>
    )
}

export default Dashboard
