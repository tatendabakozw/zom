import React, { useEffect, useState } from 'react'
import SellerPage from '../Layout/SellerPage'
import { apiUrl } from '../API/apiUrl'
import axios from 'axios'
import ServiceItem from '../Components/ServiceItem'
import { GridSpinner } from '../Components/Loading'

function Shop({match}) {
    const [loading, setLoading] = useState(false)
    const [userLoading, setUserLoading] = useState(false)
    const [allproducts, setAllProducts] = useState()
    const [currentUser, setCurrentUser] = useState({})

    const storeowner = localStorage.getItem('curstoreowner')
    console.log(JSON.parse(storeowner))

    const getCurrentUser = () => {
        setUserLoading(true)
        axios.get(`${apiUrl}/user/${JSON.parse(storeowner).owner}`).then((res) => {
            setCurrentUser(res.data)
            setUserLoading(true)
            localStorage.setItem('currstzom', JSON.stringify(res.data))
        }).catch((err) => {
            console.log(err)
        })
        // console.log(currentUser)
    }
    // console.log(match.params.account)

    const getUserProducts = () => {
        setLoading(true)
        axios.get(`${apiUrl}/products/user/${JSON.parse(storeowner).owner}`).then((res) => {
            setAllProducts(res.data.products)
            setLoading(false)
            
        }).catch((err) => {
            console.log(err)
        })
        console.log(allproducts)
    }

    useEffect(() => {
        getCurrentUser()
        getUserProducts()
    }, [])

    return (
        <SellerPage>
            <div className="below mt-16 px-16">
                <p className="text-gray-700 dark:text-white mb-8 font-semibold">Most Popular {" "} </p>
                {!loading ? (<div className="items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <>
                        {
                            allproducts?.map(product => (
                                <ServiceItem
                                    key={product._id}
                                    className="col-span-1 bg-white"
                                    picture={product.userpic}
                                    category={product.category}
                                    itemname={product.name}
                                    rating="4.5"
                                    verified={product.verified}
                                    catPicture={`${apiUrl}/${product.productpicture[0].img}`}
                                    bgColor="bg-green-200"
                                    price={product.price}
                                    tags={product.tags}
                                    owner={product.owner}
                                    discount={product.discountPrice}
                                    description={product.description}
                                    id={product._id}
                                    userpic={`${apiUrl}/${product.userpic[0].img}`}
                                />
                            ))
                        }
                    </>

                </div>) : (
                    <div className="loading" className="mx-auto grid grid-cols-3 gap-8">
                        <div className="grid col-span-1">
                            <GridSpinner size={200} color={'#059669'} />
                        </div>
                        <div className="grid col-span-1">
                            <GridSpinner size={200} color={'#059669'} />
                        </div>
                        <div className="grid col-span-1">
                            <GridSpinner size={200} color={'#059669'} />
                        </div>
                    </div>
                )}
            </div>
        </SellerPage>
    )
}

export default Shop
