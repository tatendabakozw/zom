import React from 'react'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CategoryIcon from '@material-ui/icons/Category';
import { useStateValue } from '../StateContext/StateProvider';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link, useHistory } from 'react-router-dom';
import General from '../Layout/General';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

function ProductDescription() {
    const desc = localStorage.getItem('zompdesc')
    const classes = useStyles();
    const history = useHistory()

    const [{ }, dispatch] = useStateValue()
    const addToBasket = (e) => {
        e.preventDefault()
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: JSON.parse(desc).id,
                name: JSON.parse(desc).itemname,
                description: JSON.parse(desc).description,
                price: JSON.parse(desc).price,
                picture: JSON.parse(desc).picture,
                owner: JSON.parse(desc).owner,
                discount: JSON.parse(desc).discount,
                category: JSON.parse(desc).category,
                catPic: JSON.parse(desc).catPicture
            }
        })
    }

    const setUserStore = (e) => {
        e.preventDefault()
        const ZOMstoreOwner = {
            owner: JSON.parse(desc).owner,
            userpic: JSON.parse(desc).userpic
        }
        localStorage.setItem('curstoreowner', JSON.stringify(ZOMstoreOwner))
        history.push('/shop')
    }

    return (
        <General>
            <div className="min-h-screen flex flex-col md:flex-row w-full md:p-8 p-4">
                <div className="left flex flex-col md:w-1/2 w-full mb-3">
                    <Link to='/' className="flex flex-row items-center text-gray-400 md:mb-4 mb-1">
                        <KeyboardBackspaceIcon />
                        <p>Continue Shopping</p>
                    </Link>
                    <div className="border-b border-gray-300 dark:border-gray-500 w-full my-4"></div>
                    <div className="w-2/3 flex flex-col items-center mx-auto">
                        <img src={JSON.parse(desc).catPicture} className="w-full" alt="description_picture" className="self-center rounded" />
                    </div>
                </div>
                <div className="md:w-1/2 w-full flex flex-col px-4">
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-xl text-gray-800 dark:text-white font-semibold capitalize">{JSON.parse(desc).itemname}</p>
                        <div className="mb-4"></div>
                        <div className="categories self-center flex flex-row">
                            <p className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 rounded p-1 text-xs">{JSON.parse(desc).category}</p>
                            <div className="flex-1"></div>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 dark:border-gray-500 w-full my-4"></div>
                    <div className="flex flex-row items-center md:my-8 my-4 justify-between">
                        <p className="text-gray-700 dark:text-white text-sm line-through">${" "}{JSON.parse(desc).price}</p>
                        <div className="mr-3"></div>
                        <p className="text-green-700 dark:text-green-500 text font-semibold ">New Price: {" "}${" "}{JSON.parse(desc).discount}</p>
                    </div>
                    <span className="mb-8">
                        <p className=" text-sm dark:text-gray-200 text-gray-800">Description: {"     "}{JSON.parse(desc).description}</p>
                        {/* <p className="text-xs text-gray-700 text-left"></p> */}
                    </span>
                    <div className="flex md:flex-row mb-8 flex-col justify-between px-3 items-center">
                        <input type="number" className="outline-none md:w-16 w-2/3 border border-gray-500  dark:border-gray-800 dark:bg-gray-800 dark:placeholder-white rounded" placeholder="QTY" />
                        <div className="flex md:flex-col flex-row items-center">
                            <p className="text-gray-400 dark:text-white uppercase text-sm">Total Price</p>
                            <p className="text-gray-700 dark:text-gray-200 font-bold">${" "}{JSON.parse(desc).discount}</p>
                        </div>
                        <button onClick={addToBasket} className="text-white bg-green-500 rounded outline-none md:px-1 p-2 text-sm">Add To Cart</button>
                    </div>
                    {/* <div className="border-b border-gray-300 w-full my-4"></div>
                    <div className="flex flex-col p-1">
                        <p className="text-gray-700 font-bold">Precautions & Dosage</p>
                        <p className="text-sm">{JSON.parse(desc).precautions}</p>
                        <p className="text-sm">{JSON.parse(desc).dosage}</p>
                    </div> */}
                    <div className="border-b border-gray-300 dark:border-gray-500 w-full my-4"></div>
                    <span onClick={setUserStore} className="flex items-center flex-row p-4 border border-gray-200 dark:border-gray-800 dark:bg-gray-800 rounded hover:shadow-lg cursor-pointer">
                        <Avatar alt="Tatenda Bako" src={JSON.parse(desc).userpic} className={classes.small} />
                        <div className="flex flex-col ml-2">
                            <p className="font-semibold dark:text-white text-gray-600">View Seller</p>
                            <p className="text-xs text-gray-400">View seller's shop and other things they sell</p>
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex flex-row items-center text-red-500">
                            <p>Explore</p>
                            <ArrowRightAltIcon />
                        </div>
                    </span>
                    {/* <div className="flex items-center flex-row p-4 mt-4 bg-gray-200 rounded shadow">
                        <CategoryIcon className="text-green-700 mr-3" fontSize="large" />
                        <div className="flex flex-col">
                            <p className="font-semibold text-gray-600">Other Categories</p>
                            <p className="md:text-sm text-xs text-gray-600">View related categories</p>
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex flex-row items-center text-red-500">
                            <p>More</p>
                            <ArrowRightAltIcon />
                        </div>
                    </div> */}
                    
                    
                </div>
            </div>
        </General>
    )
}

export default ProductDescription
