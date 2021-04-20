import React from 'react'
import {Link } from 'react-router-dom'

function DashboardFooter() {
    return (
        <>
            <footer className="pb-4 dark:bg-black bg-gray-50">
                <div className="container mx-auto px-4">
                    <hr className="mb-4 w-full border-b-1 border-gray-300" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4">
                            <div className="text-sm text-gray-600 font-semibold py-1 self-center flex flex-row items-center justify-between">
                                <p>Copyright © {new Date().getFullYear()}{" "}</p>
                                <p
                                    className="text-gray-600 hover:text-gray-800 text-sm font-semibold py-1"
                                >
                                    Zim Online Market
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-8/12 px-4">
                            <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                                {/* <li>
                                    <p
                                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                                    >
                                        Global Master Auction
                                    </p>
                                </li> */}
                                <li>
                                    <Link to='/about'
                                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/about'
                                        className="text-gray-700 hover:text-gray-900 text-sm font-semibold block py-1 px-3"
                                    >
                                        Blog
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default DashboardFooter
