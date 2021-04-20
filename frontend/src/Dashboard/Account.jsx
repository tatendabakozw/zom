import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import tatenda from '../Images/tatenda.jpg'
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StoreDashboard from '../Layout/StoreDashboard';
import { apiUrl } from '../API/apiUrl';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

function Account() {
    const classes = useStyles();
    const user = localStorage.getItem('zomuser')
    return (
        <StoreDashboard>
            <div className="flex flex-row px-16 py-8">
                <div className="left w-1/5 flex flex-col">
                    <p className="text-gray-600 font-semibold dark:text-white hover:bg-green-300 hover:text-gray-700 rounded-full py-1 px-2 cursor-pointer">Account</p>
                    <p className="text-gray-600 font-semibold dark:text-white hover:bg-green-300 hover:text-gray-700 rounded-full py-1 px-2 cursor-pointer">Billing Information</p>
                </div>
                <div className="right w-4/5 flex-col flex">
                    <button className="bg-green-900 self-end rounded flex-row flex items-center px-2 py-1 mb-2 text-white">
                        <ExitToAppIcon/>
                        <p>Logout</p>
                        </button>
                    <div className="bg-white dark:bg-gray-900 flex flex-col shadow w-full rounded p-8">
                        <form action="" className="flex flex-col">
                            <div className="email flex flex-row items-center">
                                <Avatar alt="Tatenda Bako" src={`${apiUrl}/${JSON.parse(user).picture[0].img}`} className={classes.small} />
                                <button className="bg-white shadow hover:bg-blue-700 mx-2 text-blue-900 hover:text-white text-sm rounded py-1 px-2">Change</button>
                                <button className="bg-red-500 hover:bg-red-400 mx-2 text-white text-sm rounded py-1 px-2">Remove</button>
                            </div>
                            {/* <button className="bg-white shadow text-blue-700 font-semibold text-sm rounded hover:text-gray-700 mt-3 py-1 px-2 self-end">Change Picture</button> */}
                            <div className="border-b my-4 border-white"></div>
                        </form>
                        <form action="" className="flex flex-col">
                            <div className="email flex flex-row justify-between items-center">
                                <p className="text-gray-700 dark:text-white text-sm font-semibold uppercase">Email</p>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="rounded w-4/5 border p-1 dark:bg-gray-700 dark:border-gray-700 outline-none border-gray-300"
                                />
                            </div>
                            {/* <button className="bg-white shadow text-blue-700 font-semibold text-sm rounded hover:text-gray-700 mt-3 py-1 px-2 self-end">Save Email</button> */}
                            <div className="border-b my-4 border-white"></div>
                        </form>
                        <form action="" className="flex flex-col">
                            <div className="email flex flex-row justify-between items-center">
                                <p className="text-gray-700 text-sm font-semibold dark:text-white uppercase">Display Name</p>
                                <input
                                    type="text"
                                    placeholder="Display name"
                                    className="rounded w-4/5 border p-1 border-gray-300 dark:bg-gray-700 dark:border-gray-700 outline-none"
                                />
                            </div>
                            <button className="bg-white shadow text-blue-700 font-semibold text-sm rounded hover:text-gray-700 mt-3 py-1 px-2 self-end">Save Details</button>
                            <div className="border-b my-4 border-gray-300"></div>
                        </form>
                    </div>
                </div>
            </div>
        </StoreDashboard>
    )
}

export default Account
