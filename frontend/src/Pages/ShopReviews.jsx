import React, { useEffect, useState } from 'react'
import SellerPage from '../Layout/SellerPage'
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
// import iam from '../Images/IMG_5117_1_1.jpg'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { apiUrl } from '../API/apiUrl';
import io from 'socket.io-client'

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
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

function ShopReviews() {

    const [newreview, setNewReview] = useState('')
    const [general, setGeneral] = useState('')
    const [value, setValue] = React.useState(2);
    const [reviews, setReviews] = useState()
    const [loading, setLoading] = useState(false)
    const [socket, setSocket] = useState(null)

    const store = localStorage.getItem('curstoreowner')
    // console.log(JSON.parse(store))
    const user = localStorage.getItem('zomuser')
    const token = localStorage.getItem('zomtoken')

    const getReviews = () => {
        setLoading(true)
        axios.get(`${apiUrl}/review/${JSON.parse(store).owner}`).then((res) => {
            setReviews(res.data.reviews)
            setLoading(false)
            console.log(reviews)
        }).catch((err) => {
            console.log(err)
        })
    }

    const createReview = (e) => {
        e.preventDefault()
        // console.log(newreview)
        // console.log(general)
        // console.log(value)
        axios.post(`${apiUrl}/review/create`, {
            general: general,
            rating: value,
            review: newreview,
            shopowner: JSON.parse(store).owner
        }, {
            headers: {
                // "Content-Type": "multipart/form-data",
                "Authorization": token
            },
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    useEffect(() => {
        getReviews()
        const socket = io()
        setSocket(socket)
        return () => socket.close()

    }, [])

    return (
        <SellerPage>
            <div className="reviews grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8 px-16">
                <div className="left lg:col-span-3 md:col-span-2 col-span-1 w-full">
                    <p className="text-gray-800 font-semibold mb-8 dark:text-gray-100 pt-16">Business Reviews</p>
                    {reviews?.map(review => (
                        <ReviewItem
                            rating={review.rating}
                            general={review.general}
                            review={review.review}
                            picture={`${apiUrl}/${review.reviewerpic[0].img}`}
                            firstname={review.firstname}
                            lastname={review.lastname}
                            key={review._id}
                        />
                    ))}
                    {/* <ReviewItem
                        rating={4}
                        general="highly recommended"
                        review="Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Deserunt at laborum omnis, sequi autem quaerat
                        officiis eum iusto voluptate cumque nihil iste odit ex, perferendis eveniet facilis ab ullam nemo!"
                        picture={iam}
                        firstname="Tatenda"
                        lastname="Bako"
                    /> */}
                </div>
                <div className="right col-span-1">
                    <form onSubmit={createReview} className="bg-white dark:bg-gray-800 rounded shadow p-2 mt-8 flex flex-col" >
                        <p className="text-gray-700 text-center dark:text-gray-100">Leave a review</p>
                        <div className="border-b  border-gray-300 my-4 mx-8"></div>
                        <div className="reviews self-center ">
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <p className="text-gray-700 text-center text-sm dark:text-gray-100">Rate service</p>
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </Box>
                        </div>

                        <div className="inp mb-4">
                            <label htmlFor="general" className="font-normal text-sm text-gray-700 dark:text-gray-100">General</label>
                            <input
                                type="text"
                                id="general"
                                placeholder="I liked service"
                                onChange={e => setGeneral(e.target.value)}
                                className="bg-white border-2 border-gray-300 w-full dark:bg-gray-700 dark:border-gray-700 outline-none rounded text-sm font-normal p-2" />
                        </div>

                        <div className="re">
                            <label htmlFor="review" className="font-normal text-sm dark:text-gray-100 text-gray-700">Describe review</label>
                            <textarea
                                type="text"
                                id="review"
                                onChange={e => setNewReview(e.target.value)}
                                placeholder="product description"
                                className="border-2  w-full my-2 text-sm border-gray-200 bg-white dark:bg-gray-700 dark:border-gray-700 outline-none font-normal rounded p-2" />
                        </div>
                        <button type="submit" className="bg-green-600 text-white rounded-full hover:bg-green-500 px-2 py-1 text-sm">Post Review</button>
                    </form>
                </div>
            </div>
        </SellerPage>
    )
}

const ReviewItem = ({ rating, general, picture, review, firstname, lastname }) => {
    const classes = useStyles();

    return (

        <div className="dic">
            <div className="reviewitem grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 w-full">
                <div className="flex flex-row items-center dark:text-gray-100 col-span-1">
                    <Avatar alt="Remy Sharp" src={picture} className={classes.large} />
                    <p className="text-gray-800 dark:text-gray-100 font-semibold">{firstname}{" "}{lastname}</p>
                </div>
                <div className="lg:col-span-3 md:col-span-2 grid-cols-1 flex flex-col">
                    <span className="text-yellow-500 flex flex-row items-center">
                        {Array.apply(null, { length: rating }).map((e, i) => (
                            <span className="ratingitems" key={i}>
                                <StarIcon />
                            </span>
                        ))}
                    </span>
                    <p className="text-gray-800 dark:text-white font-semibold">{general}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{review}</p>
                </div>

            </div>
            <div className="border-b  border-gray-300 my-8 mx-8"></div>
        </div>
    )
}

export default ShopReviews
