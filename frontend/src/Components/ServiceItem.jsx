import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateContext/StateProvider'
import StarRateIcon from '@material-ui/icons/StarRate';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useHistory } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Money from './Money';

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

const ServiceItem = ({ className, picture, category, userpic, itemname, rating, verified, catPicture, bgColor, price, id, discount, description, owner, tags }) => {

    const classes = useStyles();
    const [{ }, dispatch] = useStateValue()
    const history = useHistory()
    const [save, setSaved] = useState(false)
    const [{currency}] = useStateValue()
    const [dispCurrency, setDispCurrency] = useState('')

    const addTocart = (e) => {
        e.preventDefault()
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                picture: picture,
                category: category,
                itemname: itemname,
                rating: rating,
                verified: verified,
                catPicture: catPicture,
                price: price,
                id: id,
                discount: discount,
                description: description,
                owner: owner,
                catPicture: catPicture,
            }
        })
    }

    const setDesc = (e) => {
        e.preventDefault()
        const desc = {
            id: id,
            picture: picture,
            category: category,
            itemname: itemname,
            rating: rating,
            verified: verified,
            price: price,
            id: id,
            discount: discount,
            description: description,
            catPicture: catPicture,
            owner: owner,
            userpic: userpic
        }
        localStorage.setItem('zompdesc', JSON.stringify(desc))
        history.push('/description')
    }

    const setUserStore = (e) => {
        e.preventDefault()
        const ZOMstoreOwner = {
            owner: owner,
            userpic: userpic,
            rating: rating,
            verified: verified,
        }
        localStorage.setItem('curstoreowner', JSON.stringify(ZOMstoreOwner))
        history.push(`/shop/${owner}`)
        // history.push('/dresses?color=blue')
    }

    useEffect(()=>{
        setDispCurrency(currency)
    },[currency])

    return (
        <div className={` ${className} items min-w-52 border dark:border-gray-900 dark:bg-gray-800 rounded-md overflow-hidden hover:shadow-lg hover:border-none cursor-pointer`}>
            <div onClick={setDesc} className="image h-40 w-full bg-green-200 dark:bg-green-700 flex justify-end p-2" style={{
                backgroundImage: `url(${catPicture})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
            </div>
            <div className="flex flex-col p-2 dark:bg-gray-800">
                <div className="service">
                    <p className="text-gray-700 dark:text-white capitalize">{itemname}</p>
                </div>

                <div className="ratingselller flex flex-row items-center my-2 justify-between">
                    <div className="rating bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-gray-700 rounded flex flex-row items-center">
                        <StarRateIcon fontSize="small" style={{ fill: "orange" }} />
                        <p className="text-xs p-1 " >{rating}/5</p>
                    </div>
                    {
                        verified === "no" ? (<div className="saved flex flex-row items-center dark:text-blue-700 text-blue-600">
                            <ThumbUpIcon fontSize="small" />
                            <p className="text-xs">Verified</p>
                        </div>) : (<div className="saved flex flex-row dark:bg-gray-700 dark:text-gray-300 bg-gray-100 p-1 rounded text-xs items-center text-gray-600">
                            {/* <ThumbUpIcon fontSize="small" /> */}
                            <p className="text-xs">Not Verified</p>
                        </div>)
                    }


                </div>
                {/* related categories */}
                <div className="relatedcategories flex-wrap flex items-center justify-between">
                    {discount >= 0 ? (
                        <>
                            <span className="flex items-center">
                                <p className="text-gray-400 dark:text-gray-300 text-sm">$</p>
                                <p className="text-gray-400 dark:text-gray-300 text-sm line-through">
                                    <Money 
                                        amount={price}
                                        currency={dispCurrency}
                                        discount={discount}
                                    />
                                </p>
                            </span>
                            <span className="flex items-center">
                                <p className="text-gray-700 dark:text-gray-200">$</p>
                                <p className="text-gray-700 dark:text-gray-200">
                                    <Money 
                                        amount={discount}
                                        currency={dispCurrency}
                                        discount={discount}
                                    />
                                </p>
                            </span>
                        </>
                    ) : (
                        <span className="flex items-center">
                            <p className="text-gray-700 dark:text-gray-200">$</p>
                            <p className="text-gray-700 dark:text-gray-200">
                                 <Money 
                                    amount={price}
                                    currency={dispCurrency}
                                    discount={discount}
                                />
                            </p>
                        </span>
                    )}

                </div>
                {/* {tags?.map(tag => (
                    <ItemCategory realatedcatefory={tag} />
                ))} */}

                <div className="flex-1"></div>

                <span onClick={setUserStore} className="category flex flex-row items-center mb-2 mt-2">
                    <div className="propic">
                        <Avatar alt="Tatenda Bako" src={userpic} className={classes.small} />
                    </div>
                    <div className={`cat ${bgColor} dark:bg-green-600 dark:text-gray-200 font-light rounded-sm m-1 flex flex-row items-center`}>
                        <p className="text-xs px-2">{category}</p>
                    </div>
                </span>
                <div className="flex-1"></div>
                <div className="border-b  border-gray-300 mb-2"></div>
                <div className="grid grid-cols-5 gap-2">
                    <span onClick={setUserStore} className="text-xs col-span-3 text-center dark:bg-green-600 dark:text-gray-200 dark:border-green-600 border hover:bg-green-600 hover:text-white text-gray-700  border-gray-300 rounded-full p-1">
                        View Seller
                    </span>
                    {!save ? (
                        <span onClick={() => setSaved(true)} className="saved col-span-1 flex text-pink-600">
                            <FavoriteIcon />
                            {/* <p className="text-xs">Saved</p> */}
                        </span>) : (
                        <span onClick={() => setSaved(false)} className="saved col-span-1 flex text-gray-600">
                            <FavoriteBorderIcon />
                            {/* <p className="text-xs">Save</p> */}
                        </span>)}
                    <span onClick={addTocart} className="text-red-500 col-span-1 hover:text-red-700">
                        <AddShoppingCartIcon />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ServiceItem
