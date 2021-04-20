import React from 'react'
import SellerPage from '../Layout/SellerPage'

function ShopAbout() {

    const store = localStorage.getItem('currstzom')
    console.log(JSON.parse(store))

    return (
        <SellerPage>
            <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal capitalize mb-2 text-gray-800 dark:text-white">
                    {JSON.parse(store).firstname}{" "}{JSON.parse(store).lastname}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 dark:text-gray-300 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                        {JSON.parse(store).username}
                    </div>
                <div className="mb-2 text-gray-700 mt-10 dark:text-gray-300">
                    <i className="mr-2 text-lg dark:text-gray-300 text-gray-500"></i>
                    {JSON.parse(store).phonenumber} - {JSON.parse(store).email}
                </div>
                <div className="mb-2 text-gray-700 dark:text-gray-300">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    {JSON.parse(store).address}
                </div>
            </div>
            <div className="mt-10 py-10 border-t border-gray-300 text-center">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg dark:text-white leading-relaxed text-gray-800">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nihil eius, 
                            recusandae unde sunt id vel numquam ullam distinctio. 
                            Possimus quae corporis temporibus nobis. At quas nesciunt suscipit quisquam quia.
                        </p>
                        <a
                            href="#pablo"
                            className="font-normal text-green-500"
                            onClick={e => e.preventDefault()}
                        >
                            Chat Now
                        </a>
                    </div>
                </div>
            </div>
        </SellerPage>
    )
}

export default ShopAbout
