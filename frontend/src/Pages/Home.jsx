import React, { useState, useEffect } from 'react'
import RemoveIcon from '@material-ui/icons/Remove';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import userT from '../Images/IMG_5117_1_1.jpg'
import bannerG from '../Images/bannerG.png'
import General from '../Layout/General';
import ServiceItem from '../Components/ServiceItem';
import CheckItem from '../Components/CheckItem';
import axios from 'axios';
import { apiUrl } from '../API/apiUrl';
import { GridSpinner } from '../Components/Loading';
import { useStateValue } from '../StateContext/StateProvider';
import { sort_by } from '../Helpers/Sort';
import Text from '../Components/Text';

function Home() {
    // const [checked, setChecked] = useState(true);
    // const [range, setRange] = useState('')

    const [allproducts, setAllProducts] = useState()
    const [loading, setLoading] = useState(false)
    const [apiCats, setApiCats] = useState()
    const [sortBy, setSortBy] = useState('')
    const [filteredProducts, setFilteredProducts] = useState()
    const [{ search }] = useStateValue()
    console.log(search.searchItem?.toLowerCase())
    // console.log(sortBy)

    const getCategories = () => {
        // GET request using fetch inside useEffect React hook
        fetch(`${apiUrl}/category/all`)
            .then(response => response.json())
            .then(data => setApiCats(data.categories));
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
        // console.log(apiCats)
    }

    const getAllProducts = () => {
        setLoading(true)
        axios.get(`${apiUrl}/products/all`).then((res) => {
            setAllProducts(res.data.products)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllProducts()
        getCategories()
    }, [])

    useEffect(() => {
        setFilteredProducts(
            allproducts?.filter(product =>
                product.name.toLowerCase().includes(search.searchItem?.toLowerCase()) ||
                product.category.toLowerCase().includes(search.searchItem?.toLowerCase()) ||
                product.location.toLowerCase().includes(search.searchItem?.toLowerCase())
            )
        )
    }, [search, allproducts])

    // console.log(allproducts)
    // console.log(allproducts?.sort(sort_by('price', sortBy, parseInt)));

    return (
        <General>
            {/* <div className="sda">
                <div className="relative dark:bg-gray-900 py-2">
                    <div className="flex flex-row pl-2 items-center whitespace-nowrap space-x-5 sm:space-x-10  overflow-hidden ">
                        {apiCats?.map(cats => (
                            <Text
                                content={cats.name}
                                className="cursor-pointer text-[0.9rem] transition duration-100 transform hover:scale-125 active:text-green-600" />
                        ))}
                    </div>
                </div>
            </div> */}
            <div className="div    pb-8">

                <div className="relative pt-8 md:pt-16 md:pb-16 pb-4 flex content-center items-center justify-center overflow-hidden"
                    style={{
                        minHeight: "75vh"
                    }}>
                    <div className="absolute top-0 w-full h-72 md:px-24 px-2 overflow-hidden bg-center pb-6 bg-cover dark:bg-gray-900 bg-gray-50"
                    // style={{
                    //     backgroundImage: `url("${bannerG}")`,
                    //     backgroundSize: '100%'
                    // }}
                    >
                        <img src={bannerG} alt="banner" className="w-full" />
                        <span id="blackOverlay" className="w-full h-full absolute"></span>
                    </div>
                </div>

                <section className="md:-mt-44 -mt-96 md:px-20 px-4">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            <div className="lg:pt-12 pt-6 w-full px-4 text-center">
                                <div className="relative flex flex-col min-w-0 w-full mb-8">
                                    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8 ">
                                        <div className="border border-gray-300 dark:border-gray-800 rounded-sm p-3 max-h-screen bg-white dark:bg-gray-800 pr-4 lg:flex col-span-1 md:hidden hidden flex-col">
                                            <span className="flex flex-row items-center mb-4 dark:text-white">
                                                <RemoveIcon fontSize="small" />
                                                <p className="text-green-700 dark:text-green-500 font-semibold">Select Categories</p>
                                                <div className="flex-1 "></div>
                                                <ExpandMoreIcon fontSize="small" />
                                            </span>
                                            {apiCats?.map(category => (
                                                <CheckItem
                                                    key={category._id}
                                                    text={category.name}
                                                    id={category.id}
                                                />
                                            ))}

                                        </div>
                                        <div className="col-span-3 md:pl-8 w-full">
                                            <div className="top flex mb-4 flex-row items-center ">
                                                <p className="md:text-xl text-sm text-green-900 dark:text-white flex flex-row items-center">
                                                    {filteredProducts?.length > 0 ? (<>{filteredProducts?.length}{' '} Search Results</>) : (<>{allproducts?.length}{' '} Items</>)}

                                                </p>
                                                <div className="flex-1"></div>
                                                <p className="text-sm text-green-900 dark:text-white font-semibold">Sort By: </p>
                                                <select
                                                    defaultValue=""
                                                    onChange={e => setSortBy(e.target.value)}
                                                    id="bidder"
                                                    className="border border-gray-300 dark:border-gray-800 dark:bg-gray-800 dark:text-white p-1 md:text-md text-xs rounded-sm outline-none ml-2">
                                                    <option disabled={true} value="">Select Price Range</option>
                                                    <option value={true}>High To Low</option>
                                                    <option value={false}>Low To High</option>
                                                </select>
                                            </div>
                                            {!loading ? (<div className="items grid grid-cols-1 min-w-32 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                <>
                                                    {
                                                        filteredProducts?.length > 0 ? (<>
                                                            {
                                                                filteredProducts?.sort(sort_by('price', sortBy, parseInt)).map(product => (
                                                                    <>
                                                                        <ServiceItem
                                                                            key={product._id}
                                                                            className="col-span-1 bg-white dark:bg-gray-900"
                                                                            picture={userT}
                                                                            category={product.category}
                                                                            itemname={product.name}
                                                                            rating="4.5"
                                                                            verified={product.verified}
                                                                            catPicture={`${apiUrl}/${product.productpicture[0].img}`}
                                                                            bgColor="bg-green-200 dark:bg-green-700"
                                                                            price={product.price}
                                                                            tags={product.tags}
                                                                            owner={product.owner}
                                                                            discount={product.discountPrice}
                                                                            description={product.description}
                                                                            id={product._id}
                                                                            userpic={`${apiUrl}/${product.userpic[0].img}`}
                                                                        />
                                                                    </>
                                                                ))
                                                            }
                                                        </>) : (<>
                                                            {
                                                                allproducts?.sort(sort_by('price', sortBy, parseInt)).map(product => (
                                                                    <ServiceItem
                                                                        key={product._id}
                                                                        className="col-span-1 bg-white"
                                                                        picture={userT}
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
                                                        </>)
                                                    }


                                                </>

                                            </div>) : (
                                                <div className="loading" className="mx-auto grid md:grid-cols-3 grid-cols-1 items-center gap-8">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



            </div>
        </General>
    )
}

export default Home
