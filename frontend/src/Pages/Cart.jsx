import React, { useState } from 'react'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useStateValue } from '../StateContext/StateProvider';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import General from '../Layout/General';
import axios from 'axios'
import { apiUrl } from '../API/apiUrl';

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
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

function Cart() {
    const [{ basket }] = useStateValue()
    // console.log(basket)
    return (
        <General>
            <div className="flex flex-col p-4">
                <div className="Cart__left self-center justify-between md:w-2/3 w-full my-4 flex flex-col">
                    <Link to='/' className="flex flex-row items-center text-gray-500 dark:text-white">
                        <KeyboardBackspaceIcon />
                        <p>Continue Shopping</p>
                    </Link>
                    <div className="border-b border-gray-300 dark:border-gray-600 my-4 w-full"></div>
                    <div className="flex flex-row justify-between mb-14">
                        <span className="flex-col">
                            <p className="text-gray-800 dark:text-white font-bold">Shopping Cart</p>
                            <p className="text-gray-600 text-sm dark:text-gray-300">You Have {basket?.length} items in your cart</p>
                        </span>
                    </div>
                    <div className="w-full">
                        {basket.map(item => (
                            <CartItem
                                picture={item.picture}
                                price={item.price}
                                name={item.itemname}
                                category={item.category}
                                id={item.id}
                                owner={item.owner}
                                catPic={item.catPicture}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </General>
    )
}

const CartItem = ({ picture, price, name, category, id, owner, catPic }) => {
    const classes = useStyles();
    // eslint-disable-next-line
    const [{ }, dispatch] = useStateValue()
    // const user = localStorage.getItem('zomuser')
    const [order, setOrder] = useState()
    const removeFromCart = (e) => {
        e.preventDefault()
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id
        })
    }

    const placeOrder = (e) => {
        e.preventDefault()
        axios.post(`${apiUrl}/order/create`,
            { ord: id },
            {
                headers: {
                    'Authorization': localStorage.getItem('zomtoken'),
                },
            }).then(res => {
                setOrder(res)
            });
        console.log(order)
    }

    return (
        <div className="shadow p-2 rounded bg-white dark:bg-gray-800 flex mb-4 md:flex-row flex-col items-center w-full">

            <div className="grid md:grid-cols-3 grid-cols-1 gap-2 items-center ml-4 justify-between">
                <div className="flex flex-row items-center justify-around w-full">
                    <Avatar variant="rounded" src={catPic} className={classes.large} />
                    <div className="flex flex-col col-span-1">
                        <p className="text-gray-800 dark:text-white font-bold">{name}</p>
                        <p className="text-sm dark:text-gray-300 text-gray-600">{category}</p>
                    </div>
                </div>
                <div className="input col-span-1 flex flex-col items-center w-full">
                    <input type="Number" placeholder="1" className="border w-full dark:bg-gray-700 dark:border-green-600 outline-none border-green-600 p-1 rounded" />
                    <p className="font-semibold col-span-1 text-sm dark:text-white">${price}</p>

                </div>
            </div>
            <div className="flex-1"></div>
            <div className=" flex flex-row items-center justify-between">
                <span onClick={placeOrder} className="flex w-full flex-row p-2 ml-2 items-center mx-auto bg-green-500 rounded text-sm text-white self-center hover:bg-green-700">
                    <p className="text-center">Order</p>
                    <ListAltRoundedIcon fontSize="small" />
                </span>
                <span className="text-red-500 hover:text-red-400 cursor-pointer" onClick={removeFromCart}>
                    <DeleteForeverOutlinedIcon fontSize="small" />
                </span>
            </div>

        </div>
    )
}

export default Cart
